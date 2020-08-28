import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
import { PageTaskResultsVO } from '@swagger/model/pageTaskResultsVO';
import { TaskResultsCreateRq } from '@swagger/model/taskResultsCreateRq';
import { TaskResultsVO } from '@swagger/model/taskResultsVO';
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

  public displayedColumns: string[] = ['taskNumber', 'attempt', 'language', 'messageOut', 'timeUsage', 'memoryUsage', 'status'];

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topicId: string;
  public task: TaskVO;
  public spinner = false;
  public taskResults: PageTaskResultsVO;

  public dataSource = new MatTableDataSource<TaskResultsVO>();

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tЭто мини-редактор VS Code.\n\tПисать код вы можете ниже или вместо комментария\n*/\n\n';

  public codeForm: FormGroup;

  public pageNumber = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

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
        tap(task => (this.task = task)),
        flatMap(() => this.taskResultsControllerService.getTasksByUserAndTaskUsingGET(this.taskId, this.pageNumber)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(taskResults => {
        this.dataSource.data = taskResults.content;
        this.taskResults = taskResults;
        this.dataSource.paginator = this.paginator;
      });
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
        tap(() => {}),
        flatMap(() => this.taskResultsControllerService.getTasksByUserAndTaskUsingGET(this.taskId, this.pageNumber)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(taskResults => {
        this.spinner = false;
        this.taskResults = taskResults;
        this.dataSource.data = taskResults.content;
      });
  }

  public selectLanguage(language: string): void {
    this.editorOptions = {
      ...this.editorOptions,
      language,
    };
  }

  public onPageFired(event): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.taskId = params.get('taskId');
        }),
        flatMap(() => this.taskResultsControllerService.getTasksByUserAndTaskUsingGET(this.taskId, event.pageIndex)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(taskResults => {
        this.dataSource.data = taskResults.content;
        this.taskResults = taskResults;
        this.pageNumber = event.pageIndex;
      });
  }
}
