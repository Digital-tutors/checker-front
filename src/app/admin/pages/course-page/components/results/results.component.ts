import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {combineLatest, Observable, of} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AppState} from '@store/app.state';
import {CourseDTO} from '@swagger/model/courseDTO';
import {filter, first, map, mergeMap} from 'rxjs/operators';
import {TaskResultControllerService} from '@swagger/api/taskResultController.service';
import {UsersResultsInterface} from './interfaces/users-results.interface';
import {PageOfTaskResultDTO} from '@swagger/model/pageOfTaskResultDTO';
import {UserControllerService} from '@swagger/api/userController.service';
import {TaskControllerService} from '@swagger/api/taskController.service';
import {TaskDTO} from '@swagger/model/taskDTO';
import {Task} from '@store/actions/task.actions';
import {TaskResult} from '@store/actions/task-result.actions';
import {MatDialog} from '@angular/material/dialog';
import {TaskSourceCodeWindowComponent} from '../../../../components/task-source-code-window/task-source-code-window.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  public displayedColumns: string[] = ['student', 'task', 'lang', 'attempt', 'completed', 'action'];

  public form: FormGroup;

  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  public data$: Observable<UsersResultsInterface[]>;

  constructor(
    private fb: FormBuilder,
    private taskResultController: TaskResultControllerService,
    private userControllerService: UserControllerService,
    private taskControllerService: TaskControllerService,
    private store: Store,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    this.data$ = this.course$.pipe(
      filter((course: CourseDTO) => !!course),
      mergeMap((course: CourseDTO) => this.taskResultController.getDecisionsByCourseUsingGET(course.id)),
      mergeMap((data: PageOfTaskResultDTO) => {
        const handledData$: Observable<UsersResultsInterface>[] = data.content.map(result => {
          return this.userControllerService
            .getUserByIdUsingGET(result.user.id)
            .pipe(
              mergeMap(user => of(user).pipe(
                first(),
                mergeMap(() => this.taskControllerService.getTaskByIdUsingGET(result.task.id)),
                map((task: TaskDTO) => ({
                  user,
                  task,
                  result,
                }))
              ))
            );
        });

        return combineLatest(handledData$);
      })
    );
  }

  public openSourceCode(item: UsersResultsInterface): void {
    this.dialog.open(TaskSourceCodeWindowComponent, {
      data: item,
      width: '60%',
    });
  }
}
