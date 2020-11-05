import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { CourseDTO } from '@swagger/model/courseDTO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-about-course-sidebar',
  templateUrl: './about-course-sidebar.component.html',
  styleUrls: ['./about-course-sidebar.component.scss'],
})
export class AboutCourseSidebarComponent implements OnInit {
  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getCourseAndData();
  }

  private getCourseAndData(): void {}

  public startCourse(): void {
    this.router.navigate([this.router.url, 'topic', 12312, 'lesson', 123123]);
  }
}
