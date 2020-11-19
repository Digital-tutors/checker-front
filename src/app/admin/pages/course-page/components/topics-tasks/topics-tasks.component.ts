import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { combineLatest, Observable, race, Subject } from 'rxjs';
import { filter, map, mergeMap, repeatWhen } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { LessonAdminControllerService } from '@swagger/api/lessonAdminController.service';
import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TaskAdminControllerService } from '@swagger/api/taskAdminController.service';
import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicAdminControllerService } from '@swagger/api/topicAdminController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { TaskDTO } from '@swagger/model/taskDTO';
import { TopicDTO } from '@swagger/model/topicDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import { Topic } from '@store/actions/topic.actions';
import { AppState } from '@store/app.state';

import { AboutCourseSidebarComponent } from '@share/components/about-course-sidebar/about-course-sidebar.component';
import { RouteParamsService } from '@share/services/route-params/route-params.service';
import { SidebarService } from '@share/services/sidebar.service';

import { EditTopicSidebarComponent } from '../../../../components/edit-topic-sidebar/edit-topic-sidebar.component';

import { TopicWithPayloadInterface } from './interfaces/topic-with-payload.interface';

@Component({
  selector: 'app-topics-tasks',
  templateUrl: './topics-tasks.component.html',
  styleUrls: ['./topics-tasks.component.scss'],
})
export class TopicsTasksComponent implements OnInit, OnDestroy {
  private replayFetch$: Subject<void> = new Subject();

  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  @Select(AppState.topic)
  public topic$: Observable<TopicDTO>;

  public selectedTopic: TopicDTO;

  public topicsWithLessons$: Observable<TopicWithPayloadInterface[]>;

  constructor(
    private store: Store,
    private sidebarService: SidebarService,
    private topicControllerService: TopicControllerService,
    private lessonControllerService: LessonControllerService,
    private taskControllerService: TaskControllerService,
    private courseControllerService: CourseControllerService,
    private topicAdminControllerService: TopicAdminControllerService,
    private lessonAdminControllerService: LessonAdminControllerService,
    private taskAdminControllerService: TaskAdminControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeParamsService: RouteParamsService,
  ) {}

  ngOnInit(): void {
    this.setTopicsAndLessons();
    this.handleSelectedTopicChange();
  }

  ngOnDestroy(): void {
    this.store.dispatch(new Topic.Set(null));
  }

  private handleSelectedTopicChange(): void {
    this.topic$
      .pipe(
        filter(topic => !topic),
      )
      .subscribe(() => {
        this.selectedTopic = null;
        this.sidebarService.setSidebar(AboutCourseSidebarComponent);
      });
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
      repeatWhen(() => race([this.replayFetch$.asObservable(), this.topic$.pipe(filter((topic: TopicDTO) => !!topic))])),
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

  public addTopic(): void {
    this.topicAdminControllerService
      .createTopicUsingPOST({
        title: 'Новая тема',
      })
      .pipe(
        mergeMap((topic: TopicDTO) =>
          this.topicAdminControllerService.linkWithCourseUsingPUT(+this.routeParamsService.routeParamsSnapshot().courseId, topic.id),
        ),
      )
      .subscribe(() => {
        this.replayFetch$.next();
      });
  }

  public selectTopic(topic: TopicDTO | TopicDTOShortResView): void {
    if (this.selectedTopic && this.selectedTopic.id === topic.id) {
      this.selectedTopic = null;
      this.store.dispatch(new Topic.Set(null));
      this.sidebarService.setSidebar(AboutCourseSidebarComponent);
    } else {
      this.selectedTopic = topic as TopicDTO;
      this.topicControllerService.getTopicByIdUsingGET(topic.id).subscribe((fullTopic: TopicDTO) => {
        this.store.dispatch(new Topic.Set(fullTopic));
        this.sidebarService.setSidebar(EditTopicSidebarComponent);
      });
    }
  }
}
