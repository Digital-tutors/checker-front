import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { CourseDTO } from '@swagger/model/courseDTO';

import { SidebarService } from '../../../share/services/sidebar.service';

import { coursesMock } from './courses.mock';
import {CourseAdminControllerService} from '@swagger/api/courseAdminController.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public courses$: Observable<CourseDTO[]>;

  constructor(
    private router: Router,
    private courseAdminControllerService: CourseAdminControllerService,
    private activatedRoute: ActivatedRoute,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit(): void {
    this.setCourses();
    this.sidebarService.setSidebar(null);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private setCourses(): void {
    this.courses$ = this.courseAdminControllerService.getMyOwnCoursesUsingGET(0).pipe(map(data => data.content));
  }

  public goToCourse(courseId: number): void {
    this.router.navigate([courseId], { relativeTo: this.activatedRoute });
  }

  public createCourse(): void {
    this.courseAdminControllerService.createCourseUsingPOST({}).subscribe((course: CourseDTO) => this.goToCourse(course.id));
  }
}
