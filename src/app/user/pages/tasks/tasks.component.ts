import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { filter, first, flatMap, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { TaskVO } from '@swagger/model/taskVO';
import { TopicVO } from '@swagger/model/topicVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

enum SubscribeStatus {
  NOT_SUBSCRIBED,
  LOAD,
  SUBSCRIBED,
}

@Component({
  selector: 'app-user-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topicId: string;
  public topic: TopicVO;
  public tasks: TaskVO[];
  public spinner = SubscribeStatus.NOT_SUBSCRIBED;

  constructor(private taskControllerService: TaskControllerService, private topicControllerService: TopicControllerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.topicId = params.get('id');
        }),
        flatMap(params => this.taskControllerService.getTasksByTopicIdUsingGET(params.get('id'))),
        tap(tasks => (this.tasks = tasks)),
        flatMap(() => combineLatest(this.topicControllerService.getTopicByIdUsingGET(this.topicId), this.user$)),
        filter(([topic, user]) => !!topic && !!user),
        first(),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(([topic, user]) => {
        this.topic = topic;
        this.spinner = this.topic.subscribe ? SubscribeStatus.SUBSCRIBED : SubscribeStatus.NOT_SUBSCRIBED;
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  subscribe() {
    this.spinner = SubscribeStatus.LOAD;

    this.user$
      .pipe(
        filter(user => !!user),
        first(),
        flatMap(user => this.topicControllerService.subscribeTopicUsingPOST(this.topicId, user.id)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(() => {
        this.spinner = SubscribeStatus.SUBSCRIBED;
      });
  }
}
