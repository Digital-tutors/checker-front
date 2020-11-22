import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import {filter, map} from 'rxjs/operators';

import { CourseControllerService } from '@swagger/api/courseController.service';
import { CourseDTO } from '@swagger/model/courseDTO';

import { SidebarService } from '../../../share/services/sidebar.service';

import { coursesMock } from './courses.mock';
import {TeacherWindowComponent} from '../../../admin/components/teacher-window/teacher-window.component';
import {MatDialog} from '@angular/material/dialog';
import {Select} from '@ngxs/store';
import {AppState} from '@store/app.state';
import {UserDTO} from '@swagger/model/userDTO';
import RoleEnum = UserDTO.RoleEnum;

@Component({
  selector: 'app-user-profile',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public courses$: Observable<CourseDTO[]>;

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  constructor(
    private router: Router,
    private courseControllerService: CourseControllerService,
    private activatedRoute: ActivatedRoute,
    private sidebarService: SidebarService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser().subscribe(user => {
      if ([RoleEnum.TEACHER, RoleEnum.ADMIN, RoleEnum.SUPERADMIN].includes(user.role)) {
        const dialogRef = this.dialog.open(TeacherWindowComponent, {
          width: '600px',
        });
      }
    });

    this.setCourses();
    this.sidebarService.setSidebar(null);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private getUser(): Observable<UserDTO> {
    return this.user$.pipe(
      filter(user => !!user),
    );
  }

  private setCourses(): void {
    this.courses$ = this.courseControllerService.getCoursesUsingGET(0).pipe(map(data => data.content));
  }

  public goToCourse(courseId: number): void {
    this.router.navigate([courseId], { relativeTo: this.activatedRoute });
  }
}
