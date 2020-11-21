import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Select, Store} from '@ngxs/store';

import {combineLatest, EMPTY, Observable, of, Subject} from 'rxjs';
import {catchError, filter, map, mergeMap} from 'rxjs/operators';

import {CourseControllerService} from '@swagger/api/courseController.service';
import {LessonControllerService} from '@swagger/api/lessonController.service';
import {TaskControllerService} from '@swagger/api/taskController.service';
import {TopicControllerService} from '@swagger/api/topicController.service';
import {CourseDTO} from '@swagger/model/courseDTO';
import {TopicDTOShortResView} from '@swagger/model/topicDTOShortResView';

import {Course} from '@store/actions/course.actions';
import {AppState} from '@store/app.state';

import {AboutCourseSidebarComponent} from '@share/components/about-course-sidebar/about-course-sidebar.component';
import {SidebarService} from '@share/services/sidebar.service';

import {TestingService} from '../../../testing/services/testing.service';

import {TopicWithLessonsInterface} from './interfaces/topic-with-lessons.interface';

import sort from 'sort-array';
import {UserDTO} from '@swagger/model/userDTO';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {LessonWithResultInterface} from './interfaces/lesson-with-result.interface';

@Component({
  selector: 'app-user-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  public topicsWithLessons$: Observable<TopicWithLessonsInterface[]>;

  constructor(
    private sidebarService: SidebarService,
    private store: Store,
    private topicControllerService: TopicControllerService,
    private lessonControllerService: LessonControllerService,
    private taskControllerService: TaskControllerService,
    private courseControllerService: CourseControllerService,
    private testingService: TestingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.setSidebar();
    this.setCourse();
    this.setTopicsAndLessons();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private setCourse(): void {
    this.courseControllerService
      .getCourseByIdUsingGET(this.activatedRoute.snapshot.params.courseId)
      .pipe(mergeMap((course: CourseDTO) => this.store.dispatch(new Course.Set(course))))
      .subscribe();
  }

  private getUser(): Observable<UserDTO> {
    return this.user$.pipe(
      filter(user => !!user),
    );
  }

  private setTopicsAndLessons(): void {
    this.topicsWithLessons$ = this.topicControllerService.getTopicsByCourseIdUsingGET(this.activatedRoute.snapshot.params.courseId).pipe(
      mergeMap((topics: TopicDTOShortResView[]) =>
        combineLatest<TopicWithLessonsInterface[]>(
          sort(topics, {by: 'priority'})
            .map((topic: TopicDTOShortResView) =>
              combineLatest([
                this.lessonControllerService.getLessonByTopicIdUsingGET(topic.id),
                this.taskControllerService.getTasksByTopicIdUsingGET(topic.id),
                this.testingService.getTestsByThemeId(topic.id),
                this.getUser().pipe(
                  mergeMap(user => this.testingService.getTestResultByTopic(topic.id, user.id).pipe(
                    catchError(() => of(null)),
                  )),
                ),
              ]).pipe(
                map(([lessons, tasks, tests, testResult]) => {
                  return {
                    topic,
                    lessons: sort(lessons, {by: 'priority'}).map(lesson => ({
                      ...lesson,
                      isFailed: testResult?.lessons?.includes(lesson.id)
                    })),
                    tasks: sort(tasks, {by: 'priority'}),
                    tests,
                  };
                }),
              ),
            ),
        ),
      ),
    );
  }

  private setSidebar(): void {
    this.sidebarService.setSidebar(AboutCourseSidebarComponent);
  }

  public redirectToLesson(topicId: number, lesson: LessonWithResultInterface): void {
    const query: any = {};

    if (lesson.isFailed) {
      query.isFailed = true;
    }

    this.router.navigate(
      ['topic', topicId, 'lesson', lesson.id],
      {
          relativeTo: this.activatedRoute,
          queryParams: query,
        }
      );
  }

  public redirectToTest(topicId: number, testId: string): void {
    this.router.navigate(['topic', topicId, 'test', testId], {relativeTo: this.activatedRoute});
  }

  public redirectToTask(topicId: number, taskId: number): void {
    this.router.navigate(['topic', topicId, 'task', taskId], {relativeTo: this.activatedRoute});
  }
}
