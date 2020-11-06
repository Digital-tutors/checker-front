import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { Observable, of, OperatorFunction } from 'rxjs';
import { filter, first, map, mergeMap, tap } from 'rxjs/operators';

import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { LessonDTO } from '@swagger/model/lessonDTO';
import { LessonDTOShortResView } from '@swagger/model/lessonDTOShortResView';
import { TopicDTO } from '@swagger/model/topicDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import { Lesson } from '@store/actions/lesson.actions';
import { Topic } from '@store/actions/topic.actions';

import { RouteParamMapInterface } from '@share/services/route-params/interfaces/route-param-map.interface';
import { RouteParamsService } from '@share/services/route-params/route-params.service';

@Component({
  selector: 'app-topic-sidebar',
  templateUrl: './topic-sidebar.component.html',
  styleUrls: ['./topic-sidebar.component.scss'],
})
export class TopicSidebarComponent implements OnInit {
  public lesson: LessonDTO;
  public lessons: LessonDTO[] = [];

  public previousTopic: TopicDTOShortResView;
  public currentTopic: TopicDTO;
  public nextTopic: TopicDTOShortResView;

  public previousTopicFirstLessonId: number;
  public nextTopicFirstLessonId: number;

  constructor(
    private router: Router,
    private routeParamsService: RouteParamsService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private lessonControllerService: LessonControllerService,
    private topicControllerService: TopicControllerService,
  ) {}

  ngOnInit(): void {
    this.getTopicAndLesson();
  }

  private topicFirstLesson(topic: TopicDTOShortResView, setter: (id: number) => void): OperatorFunction<any, LessonDTOShortResView[]> {
    return (source: Observable<any>) => {
      let observable$: Observable<LessonDTOShortResView[]> = source.pipe(map(() => []));

      if (topic) {
        observable$ = source.pipe(mergeMap(() => this.lessonControllerService.getLessonByTopicIdUsingGET(topic.id)));
      }

      return observable$.pipe(
        first(),
        tap((lessons: LessonDTOShortResView[]) => {
          if (lessons.length) {
            setter(lessons[0].id);
          }
        }),
      );
    };
  }

  private getTopicAndLesson(): void {
    this.routeParamsService.routeParams$
      .pipe(
        filter((params: RouteParamMapInterface) => !!params.topicId && !!params.lessonId),
        mergeMap((params: RouteParamMapInterface) =>
          this.topicControllerService.getTopicByIdUsingGET(params.topicId).pipe(
            tap((topic: TopicDTO) => {
              this.currentTopic = topic;
              this.store.dispatch(new Topic.Set(topic));
            }),
            mergeMap(() => this.topicControllerService.getTopicsByCourseIdUsingGET(params.courseId)),
            tap((topics: TopicDTOShortResView[]) => {
              const indexOfCurrentTopic: number = topics.findIndex(({ id }) => id === this.currentTopic.id);
              this.previousTopic = topics[indexOfCurrentTopic - 1];
              this.nextTopic = topics[indexOfCurrentTopic + 1];
            }),
            this.topicFirstLesson(this.previousTopic, (id: number) => (this.previousTopicFirstLessonId = id)),
            this.topicFirstLesson(this.nextTopic, (id: number) => (this.nextTopicFirstLessonId = id)),
            mergeMap(() => this.lessonControllerService.getLessonByIdUsingGET(params.lessonId)),
            tap(lesson => {
              this.lesson = lesson;
              this.store.dispatch(new Lesson.Set(this.lesson));
            }),
            mergeMap(() => this.lessonControllerService.getLessonByTopicIdUsingGET(params.topicId)),
          ),
        ),
      )
      .subscribe((lessons: LessonDTO[]) => (this.lessons = lessons));
  }

  private navigateToTopicLesson(topicId: number, lessonId: number): void {
    this.router.navigate(['./courses', this.routeParamsService.routeParamsSnapshot().courseId, 'topic', topicId, 'lesson', lessonId]);
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
