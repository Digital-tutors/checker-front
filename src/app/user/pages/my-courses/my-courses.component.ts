import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { CourseInteractionControllerService } from '@swagger/api/courseInteractionController.service';
import { CourseDTO } from '@swagger/model/courseDTO';

import { SidebarService } from '../../../share/services/sidebar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
})
export class MyCoursesComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public courses$: Observable<CourseDTO[]>;

  constructor(
    private router: Router,
    private courseControllerService: CourseControllerService,
    private courseInteractionService: CourseInteractionControllerService,
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
    this.courses$ = this.courseControllerService.getCoursesUsingGET(0).pipe(map(data => data.content));
  }

  public goToCourse(courseId: number): void {
    this.router.navigateByUrl(`/user/courses/${courseId}`);
  }
}
