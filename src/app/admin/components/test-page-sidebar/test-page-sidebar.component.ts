import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-test-page-sidebar',
  templateUrl: './test-page-sidebar.component.html',
  styleUrls: ['./test-page-sidebar.component.scss'],
})
export class TestPageSidebarComponent implements OnInit {
  public form: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['информатика', 'тесты', 'программирование', 'C++', 'ООП'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.setForm();

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      // tslint:disable-next-line: deprecation
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    console.log(event.option.viewValue, this.fruits);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
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

  public openSnackBar() {
    this._snackBar.open('Данные успешно сохранены', 'OK', {
      duration: 2000,
    });
  }
}
