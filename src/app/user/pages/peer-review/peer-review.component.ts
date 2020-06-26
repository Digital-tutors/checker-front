import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Select } from '@ngxs/store';

import { from, Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { PeerResultsControllerService } from '@swagger/api/peerResultsController.service';
import { PeerReviewControllerService } from '@swagger/api/peerReviewController.service';
import { PeerTaskControllerService } from '@swagger/api/peerTaskController.service';
import { PeerTaskSolutionControllerService } from '@swagger/api/peerTaskSolutionController.service';
import { PeerReviewCreateRq } from '@swagger/model/peerReviewCreateRq';
import { PeerTaskResultsVO } from '@swagger/model/peerTaskResultsVO';
import { PeerTaskSolutionVO } from '@swagger/model/peerTaskSolutionVO';
import { PeerTaskUpdateRq } from '@swagger/model/peerTaskUpdateRq';
import { PeerTaskVO } from '@swagger/model/peerTaskVO';
import { TaskResultsCreateRq } from '@swagger/model/taskResultsCreateRq';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-peer-review',
  templateUrl: './peer-review.component.html',
  styleUrls: ['./peer-review.component.scss'],
})
export class PeerReviewComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private peerTaskId: string;

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public peerTask: PeerTaskVO;
  public peerTaskSolution: PeerTaskSolutionVO;
  public gradesArray: number[];
  public gradesPrimaryArray: number[];
  public finalGrade: number = 0;
  public maxGrade: number;
  public criterionForm: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '80px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
  };

  constructor(
    private fb: FormBuilder,
    private peerTaskControllerService: PeerTaskControllerService,
    private peerTaskSolutionControllerService: PeerTaskSolutionControllerService,
    private peerReviewControllerService: PeerReviewControllerService,
    private peerResultsControllerService: PeerResultsControllerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.peerTaskId = params.get('peerTaskId');
        }),
        flatMap(params => this.peerTaskControllerService.getPeerTaskByIdUsingGET(params.get('peerTaskId'))),
        tap(task => {
          this.peerTask = task;
          this.maxGrade = this.peerTask.maxGradesPerCriterions.reduce((a, b) => a + b);
          this.gradesArray = new Array(this.peerTask.criterions.length);
          this.gradesPrimaryArray = new Array(this.peerTask.criterions.length);
          this.gradesPrimaryArray.map(v => (v = 1));
          this.setForm();
        }),
        flatMap(() => this.peerTaskSolutionControllerService.getRandomPeerTaskSolutionByTaskUsingGET(this.peerTaskId)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(peerTaskSolution => {
        console.log(peerTaskSolution);
        this.peerTaskSolution = peerTaskSolution;
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public countFinalGrade(event: any, index: number): void {
    this.gradesArray[index] = event.value / this.maxGrade;
    this.gradesPrimaryArray[index] = event.value;
    this.finalGrade = this.gradesPrimaryArray.reduce((a, b) => a + b);
  }

  private setForm(): void {
    this.criterionForm = this.fb.group({
      criterions: this.fb.array([...this.createCriterions()]),
      summaryComment: ['', [Validators.required]],
    });
  }

  private createCriterions(): FormGroup[] {
    let groups: FormGroup[] = new Array(this.peerTask.criterions.length);

    for (let index = 0; index < this.peerTask.criterions.length; index++) {
      groups[index] = this.createItem();
    }

    return groups;
  }

  public createItem(): FormGroup {
    return this.fb.group({
      criteria: ['', [Validators.required]],
    });
  }

  get criterions() {
    return this.criterionForm.get('criterions') as FormArray;
  }

  public sendReview(): void {
    const { criterions, summaryComment } = this.criterionForm.value;

    if (this.criterionForm.valid) {
      this.user$
        .pipe(
          filter(user => !!user),
          first(),
          map(user => ({
            taskId: {
              id: this.peerTask.id,
            },
            expertId: {
              id: user.id,
            },
            studentId: {
              id: this.peerTaskSolution.userId.id,
            },
            solutionId: {
              id: this.peerTaskSolution.id,
            },
            gradesPerCriterions: this.gradesArray,
            argumentsPerCriterions: [...criterions.map(v => v.criteria)],
            summaryMessagePerSolution: summaryComment,
            grade: this.gradesArray.reduce((a, b) => a + b),
          })),
          flatMap((peerTaskReview: PeerReviewCreateRq) => this.peerReviewControllerService.createPeerReviewUsingPOST(peerTaskReview)),

          takeUntil(this.ngOnDestroy$),
        )
        .subscribe(() => {
          from(this.router.navigateByUrl(`/user/topics/${this.peerTask.topicId.id}/tasks/peer/${this.peerTask.id}`));
        });
    }
  }
}
