import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { combineLatest, EMPTY, Observable, Subject } from 'rxjs';
import { catchError, filter, first, flatMap, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { TaskVO } from '@swagger/model/taskVO';
import { TopicVO } from '@swagger/model/topicVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
})
export class TopicComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topicId: string;
  public topic: any;
  public tasks: TaskVO[];
  public error: boolean;

  constructor(private taskControllerService: TaskControllerService, private topicControllerService: TopicControllerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.topicId = params.get('id');
        }),
        flatMap(params => this.taskControllerService.getTasksByTopicIdUsingGET(params.get('id'))),
        tap(tasks => (this.tasks = tasks)),
        flatMap(() => combineLatest(this.topicControllerService.getTopicByIdUsingGET(this.topicId))),
        filter(([topic]) => !!topic),
        first(),
        catchError(() => {
          this.error = true;
          return EMPTY;
        }),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(topic => {
        this.topic = topic;
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
