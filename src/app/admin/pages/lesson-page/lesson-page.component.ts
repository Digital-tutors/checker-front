import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SidebarService } from '@share/services/sidebar.service';

import { LessonPageSidebarComponent } from '../../components/lesson-page-sidebar/lesson-page-sidebar.component';

import { AlertWindowComponent } from 'app/admin/components/alert-window/alert-window.component';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit {
  constructor(private sidebarService: SidebarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(LessonPageSidebarComponent);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AlertWindowComponent, {
      width: '473px',
      height: '270px',
    });
  }
}
