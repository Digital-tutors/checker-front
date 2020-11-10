import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { CourseAdminControllerService } from '@swagger/api/courseAdminController.service';
import { CourseDTO } from '@swagger/model/courseDTO';
import { CourseDTORequestView } from '@swagger/model/courseDTORequestView';

import { Course } from '@store/actions/course.actions';
import { AppState } from '@store/app.state';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Select(AppState.course)
  public course$: Observable<CourseDTO>;

  public descriptionControl: FormControl = new FormControl();
  public skillsControls: FormControl[] = [];
  public keywordsControls: FormControl[] = [];

  constructor(private fb: FormBuilder, private courseAdminControllerService: CourseAdminControllerService, private store: Store, private _snackBar: MatSnackBar) {}

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

  private setForm(): void {
    this.course$
      .pipe(
        filter((course: CourseDTO) => !!course),
        first(),
      )
      .subscribe((course: CourseDTO) => {
        this.descriptionControl.setValue(course.description);
        this.setArrayControls(controls => (this.skillsControls = controls), course.skills);
        this.setArrayControls(controls => (this.keywordsControls = controls), course.keywords);
      });
  }

  private getControlsArrayValue(array: FormControl[]): string[] {
    return array.map((control: FormControl) => control.value);
  }

  private addControlsArrayProp(setter: (controls: FormControl[]) => void, property: FormControl[], defaultValue: string = ''): void {
    this.setArrayControls(setter, [...this.getControlsArrayValue(property), defaultValue]);
  }

  public onAddSkill(): void {
    this.addControlsArrayProp(controls => (this.skillsControls = controls), this.skillsControls, 'Новое знание');
  }

  public onAddKeyword(): void {
    this.addControlsArrayProp(controls => (this.keywordsControls = controls), this.keywordsControls, 'Новая рубрика');
  }

  public onSave(course: CourseDTO): void {
    const handledCourse: CourseDTORequestView = {
      ...course,
      description: this.descriptionControl.value,
      skills: this.getControlsArrayValue(this.skillsControls),
      keywords: this.getControlsArrayValue(this.keywordsControls),
    };

    this.courseAdminControllerService.updateCourseUsingPUT(handledCourse, course.id).subscribe(() => {
      this.store.dispatch(new Course.Set(handledCourse as CourseDTO));
    });

    this.openSnackBar();
  }

  public openSnackBar() {
    this._snackBar.open('Данные успешно сохранены', 'OK', {
      duration: 2000,
    });
  }
}
