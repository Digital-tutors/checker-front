import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { concatMap, debounceTime, filter, first, mergeMap, tap } from 'rxjs/operators';

import { CourseAdminControllerService } from '@swagger/api/courseAdminController.service';
import { CourseControllerService } from '@swagger/api/courseController.service';
import { LessonControllerService } from '@swagger/api/lessonController.service';
import { TopicControllerService } from '@swagger/api/topicController.service';
import { CourseDTO } from '@swagger/model/courseDTO';

import { Course } from '@store/actions/course.actions';
import { AppState } from '@store/app.state';

import { AboutCourseSidebarComponent } from '@share/components/about-course-sidebar/about-course-sidebar.component';
import { RouteParamsService } from '@share/services/route-params/route-params.service';
import { SidebarService } from '@share/services/sidebar.service';

@Component({
  selector: 'app-admin-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  public courseTitleControl: FormControl = new FormControl();

  private ngOnDestroy$: Subject<void> = new Subject();

  constructor(
    private sidebarService: SidebarService,
    private store: Store,
    private topicControllerService: TopicControllerService,
    private lessonControllerService: LessonControllerService,
    private courseControllerService: CourseControllerService,
    private courseAdminControllerService: CourseAdminControllerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private routeParamsService: RouteParamsService,
  ) {}

  ngOnInit(): void {
    this.routeParamsService.updateState(this.activatedRoute.snapshot.params);
    this.setCourse();
    this.setSidebar();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private updateCourseTitle(title: string): Observable<any> {
    return this.course$.pipe(
      filter((course: CourseDTO) => !!course),
      first(),
      tap((course: CourseDTO) => {
        this.store.dispatch(
          new Course.Set({
            ...course,
            title,
          }),
        );
      }),
      mergeMap((course: CourseDTO) =>
        this.courseAdminControllerService.updateCourseUsingPUT(
          {
            ...course,
            title,
          },
          course.id,
        ),
      ),
    );
  }

  private setTitleFormControl(course: CourseDTO): void {
    this.courseTitleControl.setValue(course.title);
    this.courseTitleControl.valueChanges
      .pipe(
        debounceTime(300),
        concatMap((title: string) => this.updateCourseTitle(title || 'Название курса')),
      )
      .subscribe();
  }

  private setCourse(): void {
    this.courseControllerService
      .getCourseByIdUsingGET(this.activatedRoute.snapshot.params.courseId)
      .pipe()
      .subscribe((course: CourseDTO) => {
        this.setTitleFormControl(course);
        this.store.dispatch(new Course.Set(course));
      });
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
