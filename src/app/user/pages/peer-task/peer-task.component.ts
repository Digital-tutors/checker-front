import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { PeerResultsControllerService } from '@swagger/api/peerResultsController.service';
import { PeerTaskControllerService } from '@swagger/api/peerTaskController.service';
import { PeerTaskSolutionControllerService } from '@swagger/api/peerTaskSolutionController.service';
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

  public codeForm: FormGroup;

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tВведите ваше решение здесь\n\n';

  constructor(
    private fb: FormBuilder,
    private peerTaskControllerService: PeerTaskControllerService,
    private peerTaskSolutionControllerService: PeerTaskSolutionControllerService,
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
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(peerTaskSolutions => (this.peerTaskSolutions = peerTaskSolutions));
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
        this.hasSolutionBeenSent = !this.hasSolutionBeenSent;
        this.spinner = false;
      });
  }
}
