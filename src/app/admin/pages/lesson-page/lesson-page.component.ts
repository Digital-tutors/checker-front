import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {LessonDTO} from '@swagger/model/lessonDTO';

import {Lesson} from '@store/actions/lesson.actions';
import {AppState} from '@store/app.state';

import {RouteParamsService} from '@share/services/route-params/route-params.service';
import { SidebarService } from '@share/services/sidebar.service';

import { LessonPageSidebarComponent } from '../../components/lesson-page-sidebar/lesson-page-sidebar.component';

import { AlertWindowComponent } from 'app/admin/components/alert-window/alert-window.component';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit {
  @Select(AppState.lesson)
  public lesson$: Observable<LessonDTO>;

  constructor(
    private sidebarService: SidebarService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private routeParamsService: RouteParamsService,
    private store: Store,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.routeParamsService.updateState(this.activatedRoute.snapshot.params);
    this.sidebarService.setSidebar(LessonPageSidebarComponent);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AlertWindowComponent, {
      width: '473px',
      height: '270px',
    });

    this.lesson$.subscribe(lesson => {
      dialogRef.componentInstance.taskId = lesson.id;
    });

    dialogRef.afterClosed().subscribe(() => {
      this.location.back();
    });
  }

  public handleHtmlChange(data: string, lesson: LessonDTO): void {
    this.store.dispatch(new Lesson.Set({ ...lesson, htmlBody: data }));
  }

  public goBack(): void {
    this.location.back();
  }
}
