import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { flatMap, takeUntil, tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
import { TaskVO } from '@swagger/model/taskVO';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  topicId: string;
  tasks: TaskVO[];

  constructor(private taskControllerService: TaskControllerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap(params => {
          this.topicId = params.get('id');
        }),
        flatMap(params => this.taskControllerService.getTasksByTopicIdUsingGET(params.get('id'))),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(tasks => (this.tasks = tasks));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
