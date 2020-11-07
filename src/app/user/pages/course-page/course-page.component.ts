import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { combineLatest, Observable, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TaskControllerService } from '@swagger/api/taskController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { TopicDTOShortResView } from '@swagger/model/topicDTOShortResView';

import { Course } from '@store/actions/course.actions';
import { AppState } from '@store/app.state';

import { AboutCourseSidebarComponent } from '@share/components/about-course-sidebar/about-course-sidebar.component';
import { SidebarService } from '@share/services/sidebar.service';

import { TopicWithLessonsInterface } from './interfaces/topic-with-lessons.interface';

@Component({
  selector: 'app-user-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  public topicsWithLessons$: Observable<TopicWithLessonsInterface[]>;

  constructor(
    private sidebarService: SidebarService,
    private store: Store,
    private topicControllerService: TopicControllerService,
    private lessonControllerService: LessonControllerService,
    private taskControllerService: TaskControllerService,
    private courseControllerService: CourseControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

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

  private setTopicsAndLessons(): void {
    this.topicsWithLessons$ = this.topicControllerService.getTopicsByCourseIdUsingGET(this.activatedRoute.snapshot.params.courseId).pipe(
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
    );
  }

  private setSidebar(): void {
    this.sidebarService.setSidebar(AboutCourseSidebarComponent);
  }

  public redirectToLesson(topicId: number, lessonId: number): void {
    this.router.navigate(['topic', topicId, 'lesson', lessonId], { relativeTo: this.activatedRoute });
  }

  public redirectToTest(topicId: number, testId: number): void {
    this.router.navigate(['topic', topicId, 'test', testId], { relativeTo: this.activatedRoute });
  }

  public redirectToTask(topicId: number, taskId: number): void {
    this.router.navigate(['topic', topicId, 'task', taskId], { relativeTo: this.activatedRoute });
  }
}
