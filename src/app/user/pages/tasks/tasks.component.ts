import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { flatMap, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { TaskVO } from '@swagger/model/taskVO';
import { TopicVO } from '@swagger/model/topicVO';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  topicId: string;
  topic: TopicVO;
  tasks: TaskVO[];
  spinner = 0;

  constructor(private taskControllerService: TaskControllerService, private topicControllerService: TopicControllerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.topicId = params.get('id');
        }),
        flatMap(params => this.taskControllerService.getTasksByTopicIdUsingGET(params.get('id'))),
        tap(tasks => (this.tasks = tasks)),
        flatMap(_ => this.topicControllerService.getTopicByIdUsingGET(this.topicId)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(topic => (this.topic = topic));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  subscribe() {
    this.spinner = 1;

    this.topicControllerService.subscribeTopicUsingPOST(this.topicId, '5eb45214ea2ee10742104e1f').subscribe(_ => {
      this.spinner = 2;
    });
  }
}
