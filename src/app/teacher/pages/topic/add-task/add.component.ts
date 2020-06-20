import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EMPTY, from, Subject } from 'rxjs';
import { catchError, flatMap, takeUntil, tap } from 'rxjs/operators';

import { TopicControllerService } from '@swagger/api/topicController.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public form: FormGroup;

  public error: boolean;

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };

  constructor(private fb: FormBuilder, private topicControllerService: TopicControllerService, private router: Router) {}

  ngOnInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.min(1), Validators.max(180)]],
      level: ['', [Validators.required]],
      description: ['', [Validators.required]],
      timeLimit: ['', [Validators.required, Validators.max(8)]],
      memoryLimit: ['', [Validators.required, Validators.max(5)]],
      constructions: ['', [Validators.required]],
      codes: this.fb.array([this.createItem(), this.createItem(), this.createItem()]),
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  get codes() {
    return this.form.get('codes') as FormArray;
  }

  public createItem(): FormGroup {
    return this.fb.group({
      input: '',
      output: '',
    });
  }

  public addItem(): void {
    this.codes.push(this.createItem());
  }

  public onSubmit(): void {
    console.log(this.form.value);
  }
}
