import {AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Select} from '@ngxs/store';

import {Observable, Subject} from 'rxjs';
import {delay, filter, map, mergeMap, tap} from 'rxjs/operators';

import {LessonDTO} from '@swagger/model/lessonDTO';

import {AppState} from '@store/app.state';

import {RouteParamsService} from '@share/services/route-params/route-params.service';

import {SidebarService} from '../../../share/services/sidebar.service';
import {TopicSidebarComponent} from '../../components/topic-sidebar/topic-sidebar.component';
import {LessonControllerService} from '@swagger/api/lessonController.service';
import {ReplacementVO} from '@swagger/model/replacementVO';

@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit, OnDestroy, AfterContentInit {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.lesson)
  public lesson$: Observable<LessonDTO>;

  @ViewChild('lessonContent', {read: ElementRef})
  public lessonContent: ElementRef;

  public lesson: LessonDTO;

  public levels$: Observable<any[]>;

  constructor(
    private sidebarService: SidebarService,
    private activatedRoute: ActivatedRoute,
    private routeParamsService: RouteParamsService,
    private router: Router,
    private lessonControllerService: LessonControllerService,
  ) {
  }

  ngOnInit(): void {
    this.getLevels();
    this.sidebarService.setSidebar(TopicSidebarComponent);
    this.activatedRoute.params.subscribe(params => this.routeParamsService.updateState(params));
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

  private getLevels(): void {
    this.levels$ = this.lesson$.pipe(
      filter(lesson => !!lesson),
      mergeMap(lesson => this.lessonControllerService.getReplacementByCurrentIdAndLevelUsingGET(lesson.id)),
      map((replacement: ReplacementVO) => {
        const levels: any[] = [];
        if (replacement.easy?.isReplacementExist) {
          levels.push(LessonDTO.LevelEnum.EASY);
        }
        if (replacement.middle?.isReplacementExist) {
          levels.push(LessonDTO.LevelEnum.MIDDLE);
        }
        if (replacement.hard?.isReplacementExist) {
          levels.push(LessonDTO.LevelEnum.HARD);
        }
        return levels;
      }),
    );
  }

  public handleLevelChanged(level: LessonDTO.LevelEnum): void {
    this.lessonControllerService
      .getReplacementByCurrentIdAndLevelUsingGET(this.lesson.id)
      .subscribe((replacement: ReplacementVO) => {
        if (replacement[level.toLowerCase()].isReplacementExist) {
          const url = this.router.url.split('/').slice(0, this.router.url.split('/').length - 1).join('/') + `/${replacement[level.toLowerCase()].replacementItemId}`;
          this.router.navigateByUrl(url);
        }
      });
  }
}
