import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { LessonSidebarComponent } from '../../components/lesson-sidebar/lesson-sidebar.component';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(LessonSidebarComponent);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
