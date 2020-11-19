import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Select, Store } from '@ngxs/store';

import { EMPTY, Observable } from 'rxjs';
import { filter, first, mergeMap } from 'rxjs/operators';

import { TopicAdminControllerService } from '@swagger/api/topicAdminController.service';
import { TopicDTO } from '@swagger/model/topicDTO';

import { Topic } from '@store/actions/topic.actions';
import { AppState } from '@store/app.state';

import {AlertWindowTopicComponent} from '../alert-window-topic/alert-window-topic.component';

@Component({
  selector: 'app-edit-topic-sidebar',
  templateUrl: './edit-topic-sidebar.component.html',
  styleUrls: ['./edit-topic-sidebar.component.scss'],
})
export class EditTopicSidebarComponent implements OnInit {
  @Select(AppState.topic)
  public topic$: Observable<TopicDTO>;

  public form: FormGroup;
  public tagsControls: FormControl[] = [];

  public levels: TopicDTO.LevelEnum[] = [TopicDTO.LevelEnum.EASY, TopicDTO.LevelEnum.MIDDLE, TopicDTO.LevelEnum.HARD];
  public publishStatuses: TopicDTO.StatusEnum[] = [TopicDTO.StatusEnum.UNPUBLISHED, TopicDTO.StatusEnum.PUBLISHED];

  constructor(
    private fb: FormBuilder,
    private topicAdminControllerService: TopicAdminControllerService,
    private dialog: MatDialog,
    private store: Store,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setForm();
  }

  private setArrayControls(setter: (controls: FormControl[]) => void, values: string[]): void {
    const controls: FormControl[] = values.map((item: string) => {
      const control: FormControl = new FormControl();
      control.setValue(item);

      control.valueChanges
        .pipe(
          filter(val => !val),
          first(),
        )
        .subscribe(() => {
          const controlIndex: number = controls.findIndex(controlRef => controlRef === control);
          this.setArrayControls(
            setter,
            values.filter((_, index) => index !== controlIndex),
          );
        });

      return control;
    });

    setter(controls);
  }

  private getControlsArrayValue(array: FormControl[]): string[] {
    return array.map((control: FormControl) => control.value);
  }

  private addControlsArrayProp(setter: (controls: FormControl[]) => void, property: FormControl[], defaultValue: string = ''): void {
    this.setArrayControls(setter, [...this.getControlsArrayValue(property), defaultValue]);
  }

  public onAddTag(): void {
    this.addControlsArrayProp(controls => (this.tagsControls = controls), this.tagsControls, 'Новая рубрика');
  }

  private setForm(): void {
    this.topic$.pipe(filter(topic => !!topic)).subscribe((topic: TopicDTO) => {
      this.setArrayControls(controls => (this.tagsControls = controls), topic.tags);

      this.form = this.fb.group({
        title: [topic.title],
        level: [topic.level],
        status: [topic.status],
        priority: [topic.priority],
      });
    });
  }

  public onCancel(): void {
    this.store.dispatch(new Topic.Set(null));
  }

  public onSubmit(): void {
    this.topic$
      .pipe(
        filter(topic => !!topic),
        first(),
      )
      .subscribe((topic: TopicDTO) => {
        const handledTopic: TopicDTO = {
          ...topic,
          title: this.form.value.title,
          level: this.form.value.level,
          status: this.form.value.status,
          priority: this.form.value.priority,
          tags: this.getControlsArrayValue(this.tagsControls),
        };

        this.topicAdminControllerService
          .updateTopicUsingPUT(handledTopic, handledTopic.id)
          .pipe(
            mergeMap(() => {
              let changeStatus$: Observable<any> = EMPTY;

              if (handledTopic.status === TopicDTO.StatusEnum.UNPUBLISHED) {
                changeStatus$ = this.topicAdminControllerService.makeUnpublishedUsingPOST3(handledTopic.id);
              } else if (handledTopic.status === TopicDTO.StatusEnum.PUBLISHED) {
                changeStatus$ = this.topicAdminControllerService.makePublishedUsingPOST3(handledTopic.id);
              }

              return changeStatus$;
            }),
          )
          .subscribe(() => {
            this.store.dispatch(new Topic.Set(handledTopic));
          });
      });

    this.openSnackBar();
  }

  public openSnackBar() {
    this._snackBar.open('Данные успешно сохранены', 'OK', {
      duration: 2000,
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AlertWindowTopicComponent, {
      width: '473px',
      height: '220px',
    });

    this.topic$.subscribe(topic => {
      dialogRef.componentInstance.taskId = topic.id;
    });
  }
}
