import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { TopicAdminControllerService } from '@swagger/api/topicAdminController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { TopicDTO } from '@swagger/model/topicDTO';

import { Topic } from '@store/actions/topic.actions';
import { AppState } from '@store/app.state';

import { AboutCourseSidebarComponent } from '@share/components/about-course-sidebar/about-course-sidebar.component';
import { SidebarService } from '@share/services/sidebar.service';

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

  constructor(private fb: FormBuilder, private topicAdminControllerService: TopicAdminControllerService, private store: Store) {}

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
      });
    });
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
          tags: this.getControlsArrayValue(this.tagsControls),
        };

        this.topicAdminControllerService.updateTopicUsingPUT(handledTopic, handledTopic.id).subscribe(() => {
          this.store.dispatch(new Topic.Set(handledTopic));
        });
      });
  }
}
