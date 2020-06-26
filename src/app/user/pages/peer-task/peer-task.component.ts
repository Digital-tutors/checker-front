import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { PeerResultsControllerService } from '@swagger/api/peerResultsController.service';
import { PeerReviewControllerService } from '@swagger/api/peerReviewController.service';
import { PeerTaskControllerService } from '@swagger/api/peerTaskController.service';
import { PeerTaskSolutionControllerService } from '@swagger/api/peerTaskSolutionController.service';
import { PagePeerReviewVO } from '@swagger/model/pagePeerReviewVO';
import { PeerReviewVO } from '@swagger/model/peerReviewVO';
import { PeerTaskResultsVO } from '@swagger/model/peerTaskResultsVO';
import { PeerTaskSolutionCreateRq } from '@swagger/model/peerTaskSolutionCreateRq';
import { PeerTaskSolutionVO } from '@swagger/model/peerTaskSolutionVO';
import { PeerTaskVO } from '@swagger/model/peerTaskVO';
import { TaskResultsCreateRq } from '@swagger/model/taskResultsCreateRq';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-peer-task',
  templateUrl: './peer-task.component.html',
  styleUrls: ['./peer-task.component.scss'],
})
export class PeerTaskComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private peerTaskId: string;

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topicId: string;
  public peerTask: PeerTaskVO;
  public peerTaskSolutions: PeerTaskSolutionVO[];
  public spinner = false;
  public hasSolutionBeenSent = false;
  public peerTaskResult: PeerTaskResultsVO;

  public codeForm: FormGroup;

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tВведите ваше решение здесь\n\n';

  public displayedColumns: string[] = ['reviewNumber', 'description', 'summaryComment', 'grade'];
  public pageNumber = 0;
  public receivedReviews: PagePeerReviewVO;
  public dataSource = new MatTableDataSource<PeerReviewVO>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private peerTaskControllerService: PeerTaskControllerService,
    private peerTaskSolutionControllerService: PeerTaskSolutionControllerService,
    private peerReviewControllerService: PeerReviewControllerService,
    private peerResultsControllerService: PeerResultsControllerService,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  ngOnInit(): void {
    this.setForm();

    this.route.paramMap
      .pipe(
        tap(params => {
          this.peerTaskId = params.get('peerTaskId');
          this.topicId = params.get('id');
        }),
        flatMap(params => this.peerTaskControllerService.getPeerTaskByIdUsingGET(params.get('peerTaskId'))),
        tap(task => (this.peerTask = task)),
        flatMap(() => this.peerTaskSolutionControllerService.getPeerTaskSolutionsByUserAndTaskUsingGET(this.peerTaskId)),
        tap(peerTaskSolutions => {
          if (peerTaskSolutions.length > 0) this.hasSolutionBeenSent = true;
          this.peerTaskSolutions = peerTaskSolutions;
        }),
        flatMap(() => this.peerResultsControllerService.getPeerTaskResultByUserAndTaskUsingGET(this.peerTaskId)),
        tap(result => (this.peerTaskResult = result)),
        flatMap(() => this.peerReviewControllerService.getReceivedReviewsByUserAndTaskIdUsingGET(this.peerTaskId, this.pageNumber)),

        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(receivedReviews => {
        this.dataSource.data = receivedReviews.content;
        this.receivedReviews = receivedReviews;
        this.dataSource.paginator = this.paginator;
      });
  }

  private setForm(): void {
    this.codeForm = this.fb.group({
      code: [this.code, [Validators.required]],
    });
  }

  public selectLanguage(language: string): void {
    this.editorOptions = {
      ...this.editorOptions,
      language,
    };
  }

  private getHandledCode(): string {
    return this.codeForm.get('code').value.split('    ').join('\t');
  }

  public makeReview(): void {}

  public sendSolution(): void {
    this.spinner = true;

    this.user$
      .pipe(
        filter(user => !!user),
        first(),
        map(user => ({
          taskId: {
            id: this.peerTaskId,
          },
          userId: {
            id: user.id,
          },
          language: this.editorOptions.language,
          sourceCode: this.getHandledCode(),
        })),
        flatMap((peerTaskSolution: PeerTaskSolutionCreateRq) => this.peerTaskSolutionControllerService.savePeerTaskSolutionUsingPOST(peerTaskSolution)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(() => {
        this.hasSolutionBeenSent = true;
        this.spinner = false;
      });
  }

  public onPageFired(event): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.peerTaskId = params.get('peerTaskId');
        }),
        flatMap(() => this.peerReviewControllerService.getReceivedReviewsByUserAndTaskIdUsingGET(this.peerTaskId, event.pageIndex)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(receivedReviews => {
        this.dataSource.data = receivedReviews.content;
        this.receivedReviews = receivedReviews;
        this.pageNumber = event.pageIndex;
      });
  }

  public sortData(sort: Sort) {
    const data = this.receivedReviews.content.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'grade':
          return this.compare(a.grade, b.grade, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
