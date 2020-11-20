import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngxs/store';

import {Observable, of } from 'rxjs';
import { filter, first, mergeMap, tap } from 'rxjs/operators';

import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { LessonDTOShortResView } from '@swagger/model/lessonDTOShortResView';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTO } from '@swagger/model/topicDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import { Lesson } from '@store/actions/lesson.actions';
import { Topic } from '@store/actions/topic.actions';

import { RouteParamMapInterface } from '@share/services/route-params/interfaces/route-param-map.interface';
import { RouteParamsService } from '@share/services/route-params/route-params.service';

import { TABS } from './const/tabs.const';
import { TabsEnum } from './enums/tabs.enum';
import { TabInterface } from './interfaces/tab.interface';
import sort from 'sort-array';

@Component({
  selector: 'app-topic-sidebar',
  templateUrl: './topic-sidebar.component.html',
  styleUrls: ['./topic-sidebar.component.scss'],
})
export class TopicSidebarComponent implements OnInit {
  public lesson: LessonDTO;
  public lessons: LessonDTO[] = [];

  public task: TaskDTO;
  public tasks: TaskDTO[] = [];

  public previousTopic: TopicDTOShortResView;
  public currentTopic: TopicDTO;
  public nextTopic: TopicDTOShortResView;

  public previousTopicFirstLessonId: number;
  public nextTopicFirstLessonId: number;

  public tabs: TabInterface[] = TABS;
  public activeTab: TabsEnum = TabsEnum.LESSONS;
  public tabsEnum: typeof TabsEnum = TabsEnum;

  constructor(
    private router: Router,
    private routeParamsService: RouteParamsService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private lessonControllerService: LessonControllerService,
    private topicControllerService: TopicControllerService,
    private taskControllerService: TaskControllerService,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private topicFirstLesson(topic: TopicDTOShortResView, setter: (id: number) => void): Observable<LessonDTOShortResView[]> {
    let observable$: Observable<LessonDTOShortResView[]> = of([]);

    if (topic) {
      observable$ = this.lessonControllerService.getLessonByTopicIdUsingGET(topic.id);
    }

    return observable$.pipe(
      first(),
      tap((lessons: LessonDTOShortResView[]) => {
        if (lessons.length) {
          setter(lessons[0].id);
        }
      }),
    );
  }

  private getData(): void {
    this.routeParamsService.routeParams$
      .pipe(
        filter((params: RouteParamMapInterface) => !!params.topicId),
        mergeMap((params: RouteParamMapInterface) =>
          this.topicControllerService.getTopicByIdUsingGET(params.topicId).pipe(
            tap((topic: TopicDTO) => {
              this.currentTopic = topic;
              this.store.dispatch(new Topic.Set(topic));
            }),
            mergeMap(() => this.topicControllerService.getTopicsByCourseIdUsingGET(params.courseId)),
            tap((topics: TopicDTOShortResView[]) => {
              const indexOfCurrentTopic: number = sort(topics, 'priority')
                .findIndex(({ id }) => id === this.currentTopic.id);
              this.previousTopic = topics[indexOfCurrentTopic - 1];
              this.nextTopic = topics[indexOfCurrentTopic + 1];
            }),
            mergeMap(() => this.topicFirstLesson(this.previousTopic, (id: number) => (this.previousTopicFirstLessonId = id))),
            mergeMap(() => this.topicFirstLesson(this.nextTopic, (id: number) => (this.nextTopicFirstLessonId = id))),
            mergeMap(() => {
              let observable$: Observable<any> = this.lessonControllerService.getLessonByTopicIdUsingGET(params.topicId).pipe(
                tap((lessons: LessonDTO[]) => (this.lessons = sort(lessons, 'priority'))),
                mergeMap(() => this.taskControllerService.getTasksByTopicIdUsingGET(params.topicId)),
                tap((tasks: TaskDTO[]) => {
                  this.tasks = sort(tasks, 'priority');
                  this.task = this.tasks.find(({ id }) => id === Number(params.taskId));

                  if (this.task) {
                    this.activeTab = TabsEnum.TASKS;
                  }
                }),
              );

              if (params.lessonId) {
                observable$ = observable$.pipe(
                  mergeMap(() => this.lessonControllerService.getLessonByIdUsingGET(params.lessonId)),
                  tap(lesson => {
                    this.lesson = lesson;
                    this.store.dispatch(new Lesson.Set(this.lesson));
                  }),
                );
              }

              return observable$;
            }),
          ),
        ),
      )
      .subscribe();
  }

  public navigateToTopicLesson(topicId: number, lessonId: number): void {
    this.router.navigate(['user/courses', this.routeParamsService.routeParamsSnapshot().courseId, 'topic', topicId, 'lesson', lessonId]);
  }

  public navigateToTopicTask(topicId: number, taskId: number): void {
    this.router.navigate(['user/courses', this.routeParamsService.routeParamsSnapshot().courseId, 'topic', topicId, 'task', taskId]);
  }

  public selectTab(tab: TabsEnum): void {
    this.activeTab = tab;
  }

  public navToPreviousTopic(): void {
    this.navigateToTopicLesson(this.previousTopic.id, this.previousTopicFirstLessonId);
  }

  public navToNextTopic(): void {
    this.navigateToTopicLesson(this.nextTopic.id, this.nextTopicFirstLessonId);
  }

  public startCourse(): void {
    this.router.navigate([this.router.url, 'topic', 12312, 'lesson', 123123]);
  }
}
