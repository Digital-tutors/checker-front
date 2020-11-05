import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public form: FormGroup;
  constructor(private fb: FormBuilder) {}

  private setForm(): void {
    this.form = this.fb.group({
      studentEmail: [''],
    });
    console.log('setForm called');
  }

  ngOnInit(): void {
    this.setForm();
  }
}
