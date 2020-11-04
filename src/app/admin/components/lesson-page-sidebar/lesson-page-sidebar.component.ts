import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lesson-page-sidebar',
  templateUrl: './lesson-page-sidebar.component.html',
  styleUrls: ['./lesson-page-sidebar.component.scss'],
})
export class LessonPageSidebarComponent implements OnInit {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setForm();
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
