import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { SidebarService } from '@share/services/sidebar.service';

import { LessonPageSidebarComponent } from '../../components/lesson-page-sidebar/lesson-page-sidebar.component';

import { AlertWindowComponent } from 'app/admin/components/alert-window/alert-window.component';
import {RouteParamsService} from '@share/services/route-params/route-params.service';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AppState} from '@store/app.state';
import {Observable} from 'rxjs';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {Lesson} from '@store/actions/lesson.actions';

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
  }

  public handleHtmlChange(data: string, lesson: LessonDTO): void {
    this.store.dispatch(new Lesson.Set({ ...lesson, htmlBody: data }));
  }
}
