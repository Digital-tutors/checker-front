import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { CourseDTO } from '@swagger/model/courseDTO';

import { Course } from '@store/actions/course.actions';
import { AppState } from '@store/app.state';

import { AboutCourseSidebarComponent } from '@share/components/about-course-sidebar/about-course-sidebar.component';
import { SidebarService } from '@share/services/sidebar.service';

@Component({
  selector: 'app-admin-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  private ngOnDestroy$: Subject<void> = new Subject();

  constructor(
    private sidebarService: SidebarService,
    private store: Store,
    private topicControllerService: TopicControllerService,
    private lessonControllerService: LessonControllerService,
    private courseControllerService: CourseControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.setCourse();
    this.setSidebar();
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

  private setSidebar(): void {
    this.sidebarService.setSidebar(AboutCourseSidebarComponent);
  }

  public redirectToLesson(topicId: string, lessonId: string): void {
    this.router.navigate(['topic', topicId, 'lesson', lessonId], { relativeTo: this.activatedRoute });
  }

  public redirectToTest(topicId: string, testId: string): void {
    this.router.navigate(['topic', topicId, 'test', testId], { relativeTo: this.activatedRoute });
  }
}
