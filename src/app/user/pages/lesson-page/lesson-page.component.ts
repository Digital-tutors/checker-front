import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { TopicSidebarComponent } from '../../components/topic-sidebar/topic-sidebar.component';
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
    this.sidebarService.setSidebar(TopicSidebarComponent);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
