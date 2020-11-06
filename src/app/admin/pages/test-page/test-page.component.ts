import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import { SidebarService } from '@share/services/sidebar.service';

import { AlertWindowTestComponent } from 'app/admin/components/alert-window-test/alert-window-test.component';
import { TestPageSidebarComponent } from 'app/admin/components/test-page-sidebar/test-page-sidebar.component';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {
  public form: FormGroup;

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
}
