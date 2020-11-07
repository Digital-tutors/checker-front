import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

import { SidebarService } from '@share/services/sidebar.service';

import { AlertWindowTestComponent } from 'app/admin/components/alert-window-test/alert-window-test.component';
import { TestPageSidebarComponent } from 'app/admin/components/test-page-sidebar/test-page-sidebar.component';

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
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [];

  constructor(private sidebarService: SidebarService, private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(TestPageSidebarComponent);
    this.setForm();
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
      this.fruits.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
