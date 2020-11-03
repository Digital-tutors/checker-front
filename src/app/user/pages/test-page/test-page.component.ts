import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { SidebarService } from '../../../share/services/sidebar.service';
import { TopicSidebarComponent } from '../../components/topic-sidebar/topic-sidebar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(TopicSidebarComponent);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
