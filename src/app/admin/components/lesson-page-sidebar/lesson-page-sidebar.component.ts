import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {RouteParamsService} from '@share/services/route-params/route-params.service';
import {LessonAdminControllerService} from '@swagger/api/lessonAdminController.service';
import {LessonControllerService} from '@swagger/api/lessonController.service';
import {filter, first, mergeMap} from 'rxjs/operators';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {Select, Store} from '@ngxs/store';
import {Lesson} from '@store/actions/lesson.actions';
import {EMPTY, Observable} from 'rxjs';
import {AppState} from '@store/app.state';

@Component({
  selector: 'app-lesson-page-sidebar',
  templateUrl: './lesson-page-sidebar.component.html',
  styleUrls: ['./lesson-page-sidebar.component.scss'],
})
export class LessonPageSidebarComponent implements OnInit {
  @Select(AppState.lesson)
  public lesson$: Observable<LessonDTO>;

  public levels: LessonDTO.LevelEnum[] = [LessonDTO.LevelEnum.EASY, LessonDTO.LevelEnum.MIDDLE, LessonDTO.LevelEnum.HARD];
  public publishStatuses: LessonDTO.StatusEnum[] = [LessonDTO.StatusEnum.UNPUBLISHED, LessonDTO.StatusEnum.PUBLISHED];

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private routeParamsService: RouteParamsService,
    private lessonAdminControllerService: LessonAdminControllerService,
    private lessonControllerService: LessonControllerService,
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.routeParamsService
      .routeParams$
      .pipe(
        filter(params => !!params.lessonId),
        mergeMap(params => this.lessonControllerService.getLessonByIdUsingGET(params.lessonId)),
      )
      .subscribe((lesson: LessonDTO) => {
        this.store.dispatch(new Lesson.Set(lesson));
        this.form = this.fb.group({
          title: [lesson.title],
          level: [lesson.level],
          status: [lesson.status],
        });
      });
  }

  public onSubmit(): void {
    this.lesson$
      .pipe(
        filter(lesson => !!lesson),
        first(),
      )
      .subscribe((lesson: LessonDTO) => {
        const handledLesson: LessonDTO = {
          ...lesson,
          title: this.form.value.title,
          level: this.form.value.level,
          status: this.form.value.status,
        };

        this.lessonAdminControllerService
          .updateLessonUsingPUT(handledLesson, handledLesson.id)
          .pipe(
            mergeMap(() => {
              let changeStatus$: Observable<any> = EMPTY;

              if (handledLesson.status === LessonDTO.StatusEnum.UNPUBLISHED) {
                changeStatus$ = this.lessonAdminControllerService.makeUnpublishedUsingPOST1(handledLesson.id);
              } else if (handledLesson.status === LessonDTO.StatusEnum.PUBLISHED) {
                changeStatus$ = this.lessonAdminControllerService.makePublishedUsingPOST1(handledLesson.id);
              }

              return changeStatus$;
            }),
          )
          .subscribe(() => {
            this.store.dispatch(new Lesson.Set(handledLesson));
          });
      });
  }
}
