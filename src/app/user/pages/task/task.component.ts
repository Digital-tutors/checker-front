import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { flatMap, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
import { TaskResultsCreateRq } from '@swagger/model/taskResultsCreateRq';
import { TaskVO } from '@swagger/model/taskVO';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private taskId: string;
  topicId: string;
  task: TaskVO;
  spinner = false;

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

    const taskResults: TaskResultsCreateRq = {
      taskId: {
        id: this.taskId,
      },
      userId: {
        id: '5eb45214ea2ee10742104e1f',
      },
      language: this.editorOptions.language,
      sourceCode: this.getHandledCode(),
    };

    this.taskResultsControllerService.saveDecisionUsingPOST(taskResults).subscribe(_ => {
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
