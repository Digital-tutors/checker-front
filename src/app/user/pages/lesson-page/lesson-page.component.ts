import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';

import { LessonDTO } from '@swagger/model/lessonDTO';

import { AppState } from '@store/app.state';

import { RouteParamsService } from '@share/services/route-params/route-params.service';

import { SidebarService } from '../../../share/services/sidebar.service';
import { TopicSidebarComponent } from '../../components/topic-sidebar/topic-sidebar.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit, OnDestroy, AfterContentInit {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.lesson)
  public lesson$: Observable<LessonDTO>;

  @ViewChild('lessonContent', { read: ElementRef })
  public lessonContent: ElementRef;

  public lesson: LessonDTO;

  constructor(private sidebarService: SidebarService, private activatedRoute: ActivatedRoute, private routeParamsService: RouteParamsService) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(TopicSidebarComponent);
    this.routeParamsService.updateState(this.activatedRoute.snapshot.params);
  }

  ngAfterContentInit() {
    this.lesson$
      .pipe(
        filter(lesson => !!lesson),
        tap(lesson => {
          this.lesson = lesson;
        }),
        delay(0),
      )
      .subscribe(lesson => {
        this.lessonContent.nativeElement.innerHTML = lesson.htmlBody;
      });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
