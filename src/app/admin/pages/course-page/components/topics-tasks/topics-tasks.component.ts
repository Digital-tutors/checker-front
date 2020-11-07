import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { combineLatest, Observable, Subject } from 'rxjs';
import { map, mergeMap, repeatWhen, tap } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { LessonAdminControllerService } from '@swagger/api/lessonAdminController.service';
import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TaskAdminControllerService } from '@swagger/api/taskAdminController.service';
import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTO } from '@swagger/model/topicDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import { AppState } from '@store/app.state';

import { RouteParamsService } from '@share/services/route-params/route-params.service';

import { TopicWithPayloadInterface } from './interfaces/topic-with-payload.interface';

@Component({
  selector: 'app-topics-tasks',
  templateUrl: './topics-tasks.component.html',
  styleUrls: ['./topics-tasks.component.scss'],
})
export class TopicsTasksComponent implements OnInit {
  private replayFetch$: Subject<void> = new Subject();

  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  public topicsWithLessons$: Observable<TopicWithPayloadInterface[]>;

  constructor(
    private store: Store,
    private topicControllerService: TopicControllerService,
    private lessonControllerService: LessonControllerService,
    private taskControllerService: TaskControllerService,
    private courseControllerService: CourseControllerService,
    private lessonAdminControllerService: LessonAdminControllerService,
    private taskAdminControllerService: TaskAdminControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeParamsService: RouteParamsService,
  ) {}

  ngOnInit(): void {
    this.setTopicsAndLessons();
  }

  private setTopicsAndLessons(): void {
    this.topicsWithLessons$ = this.topicControllerService.getTopicsByCourseIdUsingGET(this.routeParamsService.routeParamsSnapshot().courseId).pipe(
      mergeMap((topics: TopicDTOShortResView[]) =>
        combineLatest(
          topics.map(topic =>
            combineLatest([
              this.lessonControllerService.getLessonByTopicIdUsingGET(topic.id),
              this.taskControllerService.getTasksByTopicIdUsingGET(topic.id),
            ]).pipe(
              map(([lessons, tasks]) => ({
                topic,
                lessons,
                tasks,
              })),
            ),
          ),
        ),
      ),
      repeatWhen(() => this.replayFetch$.asObservable()),
    );
  }

  public addLesson(topicId: number): void {
    this.lessonAdminControllerService
      .createLessonUsingPOST({
        title: 'Новое занятие',
      })
      .pipe(mergeMap((lesson: LessonDTO) => this.lessonAdminControllerService.linkWithTopicUsingPUT(lesson.id, topicId)))
      .subscribe(() => {
        this.replayFetch$.next();
      });
  }

  public addTask(topicId: number): void {
    this.taskAdminControllerService
      .createTaskUsingPOST({
        title: 'Новая задача',
      })
      .pipe(mergeMap((task: TaskDTO) => this.taskAdminControllerService.linkWithTopicUsingPUT1(task.id, topicId)))
      .subscribe(() => {
        this.replayFetch$.next();
      });
  }
}
