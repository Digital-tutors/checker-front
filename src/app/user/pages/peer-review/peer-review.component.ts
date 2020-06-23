import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { flatMap, takeUntil, tap } from 'rxjs/operators';

import { PeerResultsControllerService } from '@swagger/api/peerResultsController.service';
import { PeerTaskControllerService } from '@swagger/api/peerTaskController.service';
import { PeerTaskSolutionControllerService } from '@swagger/api/peerTaskSolutionController.service';
import { PeerTaskSolutionVO } from '@swagger/model/peerTaskSolutionVO';
import { PeerTaskVO } from '@swagger/model/peerTaskVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-peer-review',
  templateUrl: './peer-review.component.html',
  styleUrls: ['./peer-review.component.scss'],
})
export class PeerReviewComponent implements OnInit, OnDestroy, DoCheck {
  private ngOnDestroy$: Subject<void> = new Subject();
  private peerTaskId: string;

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public peerTask: PeerTaskVO;
  public peerTaskSolution: PeerTaskSolutionVO;
  public gradesArray: number[];
  public finalGrade: number = 0;
  public maxGrade: number;

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
    private peerResultsControllerService: PeerResultsControllerService,
    private route: ActivatedRoute,
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

  ngDoCheck() {}

  public countFinalGrade(): void {
    this.finalGrade = this.gradesArray.reduce((a, b) => a + b);
  }

  public sendReview(): void {}
}
