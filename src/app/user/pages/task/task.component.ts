import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
import { TaskResultsCreateRq } from '@swagger/model/taskResultsCreateRq';
import { TaskVO } from '@swagger/model/taskVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private taskId: string;

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topicId: string;
  public task: TaskVO;
  public spinner = false;

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tЭто мини-редактор VS Code.\n\tПисать код вы можете ниже или вместо комментария\n*/\n\n';

  public codeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskControllerService: TaskControllerService,
    private taskResultsControllerService: TaskResultsControllerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.setForm();

    this.route.paramMap
      .pipe(
        tap(params => {
          this.taskId = params.get('taskId');
          this.topicId = params.get('id');
        }),
        flatMap(params => this.taskControllerService.getTaskByIdUsingGET(params.get('taskId'))),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(task => (this.task = task));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private setForm(): void {
    this.codeForm = this.fb.group({
      code: [this.code, [Validators.required]],
    });
  }

  private getHandledCode(): string {
    return this.codeForm.get('code').value.split('    ').join('\t');
  }

  public sendCode(): void {
    this.spinner = true;

    this.user$
      .pipe(
        filter(user => !!user),
        first(),
        map(user => ({
          taskId: {
            id: this.taskId,
          },
          userId: {
            id: user.id,
          },
          language: this.editorOptions.language,
          sourceCode: this.getHandledCode(),
        })),
        flatMap((taskResults: TaskResultsCreateRq) => this.taskResultsControllerService.saveDecisionUsingPOST(taskResults)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(() => {
        this.spinner = false;
      });
  }

  public selectLanguage(language: string): void {
    this.editorOptions = {
      ...this.editorOptions,
      language,
    };
  }
}
