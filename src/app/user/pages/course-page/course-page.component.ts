import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';

import { SidebarService } from '../../../share/services/sidebar.service';
import { AboutCourseSidebarComponent } from '../../components/about-course-sidebar/about-course-sidebar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  constructor(private sidebarService: SidebarService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setSidebar();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
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
