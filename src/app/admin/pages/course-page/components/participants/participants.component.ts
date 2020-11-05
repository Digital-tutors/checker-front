import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss'],
})
export class ParticipantsComponent implements OnInit {
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
