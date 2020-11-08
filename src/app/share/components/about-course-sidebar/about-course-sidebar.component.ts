import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Select } from '@ngxs/store';

import { combineLatest, Observable } from 'rxjs';
import { filter, map, mergeMap, takeWhile, tap } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { CourseInteractionControllerService } from '@swagger/api/courseInteractionController.service';
import { UserControllerService } from '@swagger/api/userController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { CourseStatDTO } from '@swagger/model/courseStatDTO';
import { TeacherStatDTO } from '@swagger/model/teacherStatDTO';
import { UserDTO } from '@swagger/model/userDTO';

import { AppState } from '@store/app.state';

import { AuthorWithStatsInterface } from './interfaces/author-with-stats.interface';
import { CourseAndDataInterface } from './interfaces/course-and-data.interface';

@Component({
  selector: 'app-about-course-sidebar',
  templateUrl: './about-course-sidebar.component.html',
  styleUrls: ['./about-course-sidebar.component.scss'],
})
export class AboutCourseSidebarComponent implements OnInit {
  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  public data$: Observable<CourseAndDataInterface>;

  public hideSubscribeButton: boolean;

  constructor(
    private router: Router,
    private courseInteractionController: CourseInteractionControllerService,
    private courseControllerService: CourseControllerService,
    private userControllerService: UserControllerService,
  ) {}

  ngOnInit(): void {
    this.data$ = this.getCourseAndData();
  }

  private getCourseStats(id: number): Observable<CourseStatDTO> {
    return this.courseControllerService.getStatisticsByCourseUsingGET(id);
  }

  private getAuthorInfo(id: number): Observable<AuthorWithStatsInterface> {
    return this.userControllerService.getUserByIdUsingGET(id).pipe(
      mergeMap((author: UserDTO) =>
        this.userControllerService.getAuthorStatisticsByUserIdUsingGET(id).pipe(
          map((stats: TeacherStatDTO) => ({
            author,
            stats,
          })),
        ),
      ),
    );
  }

  private getCourseAndData(): Observable<CourseAndDataInterface> {
    return this.course$.pipe(
      filter(course => !!course),
      mergeMap((course: CourseDTO) =>
        combineLatest([this.getAuthorInfo(course.author.id), this.getCourseStats(course.id)]).pipe(
          map(([authorWithStats, courseStats]) => ({
            course,
            courseStats,
            authorWithStats,
          })),
        ),
      ),
    );
  }

  public startCourse(): void {
    combineLatest([this.user$, this.course$])
      .pipe(
        filter(([user, course]) => !!user && !!course),
        takeWhile(([user, course]) => user.id === course.author.id && !course.subscribe),
        tap(() => (this.hideSubscribeButton = true)),
        mergeMap(([user, course]) =>
          this.courseInteractionController.saveCourseInteractionUsingPOST({
            interactionEntity: {
              id: course.id,
            },
            status: 'STARTED',
          }),
        ),
      )
      .subscribe();
  }
}
