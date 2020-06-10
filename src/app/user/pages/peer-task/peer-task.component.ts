import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { PeerResultsControllerService } from '@swagger/api/peerResultsController.service';
import { PeerTaskControllerService } from '@swagger/api/peerTaskController.service';
import { PeerTaskVO } from '@swagger/model/peerTaskVO';
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
  public spinner = false;

  public codeForm: FormGroup;

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tВведите ваше решение здесь\n\n';

  constructor(
    private fb: FormBuilder,
    private peerTaskControllerService: PeerTaskControllerService,
    private peerTaskResultsControllerService: PeerResultsControllerService,
    private route: ActivatedRoute,
  ) {}

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  ngOnInit(): void {
    this.setForm();

    this.route.paramMap.pipe(
      tap(params => {
        this.peerTaskId = params.get('taskId');
        this.topicId = params.get('id');
      }),
      flatMap(params => this.peerTaskControllerService.getPeerTaskByIdUsingGET(params.get('taskId'))),
      tap(task => (this.peerTask = task)),
      flatMap(() => this.peerTaskControllerService.getTasksByUserAndTaskUsingGET(this.taskId)),
      takeUntil(this.ngOnDestroy$),
    );
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

  public sendCode(): void {}
}
