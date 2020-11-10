import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { filter, first, map, startWith } from 'rxjs/operators';

import { SidebarService } from '@share/services/sidebar.service';

import { AlertWindowTestComponent } from 'app/admin/components/alert-window-test/alert-window-test.component';
import { TestPageSidebarComponent } from 'app/admin/components/test-page-sidebar/test-page-sidebar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  public form: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['информатика', 'тесты', 'программирование', 'C++', 'ООП'];
  items: string[] = ['1', '2', '3'];
  inputValue = 'Clear me';
  public tagsControls: FormControl[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private sidebarService: SidebarService, private dialog: MatDialog, private fb: FormBuilder, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(TestPageSidebarComponent);
    this.setForm();

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AlertWindowTestComponent, {
      width: '473px',
      height: '224px',
    });
  }

  private setForm(): void {
    this.form = this.fb.group({
      title: [''],
      level: [''],
      isLevel1Enabled: [''],
      isLevel2Enabled: [''],
      isLevel3Enabled: [''],
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      console.log(input.value);
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    console.log(event.option.viewValue, this.fruits);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  private addControlsArrayProp(setter: (controls: FormControl[]) => void, property: FormControl[], defaultValue: string = ''): void {
    this.setArrayControls(setter, [...this.getControlsArrayValue(property), defaultValue]);
  }

  private getControlsArrayValue(array: FormControl[]): string[] {
    return array.map((control: FormControl) => control.value);
  }

  public onAddTag(): void {
    this.addControlsArrayProp(controls => (this.tagsControls = controls), this.tagsControls, 'Введите вариант ответа');
  }

  public openSnackBar() {
    this._snackBar.open('Данные успешно сохранены', 'OK', {
      duration: 2000,
    });
  }
}
