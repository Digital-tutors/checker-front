import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, map, takeUntil, tap } from 'rxjs/operators';

import { LessonControllerService } from '@swagger/api/lessonController.service';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { PageTaskResultsVO } from '@swagger/model/pageTaskResultsVO';
import { TaskResultsVO } from '@swagger/model/taskResultsVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

import { SidebarService } from '../../../share/services/sidebar.service';
import { TopicSidebarComponent } from '../../components/topic-sidebar/topic-sidebar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private taskId: string;

  public displayedColumns: string[] = ['taskNumber', 'attempt', 'language', 'messageOut', 'timeUsage', 'memoryUsage', 'status'];

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topicId: string;
  public task: LessonDTO;
  public spinner = false;
  public taskResults: PageTaskResultsVO;

  public dataSource = new MatTableDataSource<TaskResultsVO>();

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tЭто мини-редактор VS Code.\n\tПисать код вы можете ниже или вместо комментария\n*/\n\n';

  public codeForm: FormGroup;

  public pageNumber = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private sidebarService: SidebarService,
    private fb: FormBuilder,
    private lessonControllerService: LessonControllerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(TopicSidebarComponent);

    this.setForm();

    this.route.paramMap
      .pipe(
        tap(params => {
          this.taskId = params.get('taskId');
          this.topicId = params.get('id');
        }),
        flatMap(params => this.lessonControllerService.getLessonByIdUsingGET(Number(params.get('taskId')))),
        tap(task => (this.task = task)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe();
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
        tap(() => {}),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe();
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
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe();
  }
}
