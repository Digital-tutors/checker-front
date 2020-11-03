import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';

import { SidebarService } from '../../../share/services/sidebar.service';

import { coursesMock } from './courses.mock';

@Component({
  selector: 'app-user-profile',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public coursesMock = coursesMock;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(null);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public goToCourse(courseId: string): void {
    this.router.navigate([courseId], { relativeTo: this.activatedRoute });
  }
}
