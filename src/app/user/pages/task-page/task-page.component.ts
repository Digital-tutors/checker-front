import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, map, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TaskResultControllerService } from '@swagger/api/taskResultController.service';
import { PageOfTaskResultDTO } from '@swagger/model/pageOfTaskResultDTO';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TaskResultDTO } from '@swagger/model/taskResultDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { AppState } from '@store/app.state';

import { RouteParamsService } from '@share/services/route-params/route-params.service';

import { SidebarService } from '../../../share/services/sidebar.service';
import { TopicSidebarComponent } from '../../components/topic-sidebar/topic-sidebar.component';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {ReplacementVO} from '@swagger/model/replacementVO';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private taskId: string;

  public displayedColumns: string[] = ['taskNumber', 'attempt', 'language', 'messageOut', 'timeUsage', 'memoryUsage', 'status'];

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  public topicId: string;
  public task: TaskDTO;
  public spinner = false;
  public taskResults: PageOfTaskResultDTO;

  public dataSource = new MatTableDataSource<TaskResultDTO>();

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tЭто мини-редактор VS Code.\n\tПисать код вы можете ниже или вместо комментария\n*/\n\n';

  public codeForm: FormGroup;

  public pageNumber = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private sidebarService: SidebarService,
    private fb: FormBuilder,
    private taskControllerService: TaskControllerService,
    private taskResultControllerService: TaskResultControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private routeParamsService: RouteParamsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.routeParamsService.updateState(params));

    this.sidebarService.setSidebar(TopicSidebarComponent);

    this.setForm();

    this.route.paramMap
      .pipe(
        tap(params => {
          this.taskId = params.get('taskId');
          this.topicId = params.get('id');
        }),
        mergeMap(params => this.taskControllerService.getTaskByIdUsingGET(Number(params.get('taskId')))),
        tap(task => (this.task = task)),
        mergeMap(() => this.taskResultControllerService.getTasksResultsByUserAndTaskUsingGET(Number(this.taskId), 0)),
        tap(response => {
          this.taskResults = response;
          this.dataSource.data = response.content;
        }),
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
        mergeMap(params => this.taskResultControllerService.saveDecisionUsingPOST(params, Number(this.taskId))),
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

  public onPageFired(event: PageEvent): void {
    this.taskResultControllerService.getTasksResultsByUserAndTaskUsingGET(Number(this.taskId), event.pageIndex).subscribe((data: PageOfTaskResultDTO) => {
      this.taskResults = data;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = data.content;
    });
  }

  public handleLevelChanged(level: LessonDTO.LevelEnum): void {
    this.taskControllerService
      .getReplacementByCurrentIdAndLevelUsingGET1(this.task.id, level)
      .subscribe((replacement: ReplacementVO) => {
        if (replacement.isReplacementExist) {
          const url = this.router.url.split('/').slice(0, this.router.url.split('/').length - 1).join('/') + `/${replacement.replacementItemId}`;
          this.router.navigateByUrl(url);
        }
      });
  }
}
