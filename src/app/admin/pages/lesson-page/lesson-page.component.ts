import { Component, OnInit } from '@angular/core';

import { SidebarService } from '@share/services/sidebar.service';

import { LessonPageSidebarComponent } from '../../components/lesson-page-sidebar/lesson-page-sidebar.component';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit {
  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(LessonPageSidebarComponent);
  }
}
