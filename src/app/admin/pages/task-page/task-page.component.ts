import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit {
  private ngOnDestroy$: Subject<void> = new Subject();

  public form: FormGroup;

  public topicId: string;

  public error: boolean;

  public editorOptions = {
    minimap: {
      enabled: false,
    },
    language: 'cpp',
  };

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.setForm();

    this.route.paramMap
      .pipe(
        tap(params => {
          this.topicId = params.get('id');
        }),
      )
      .subscribe();
  }

  private setForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.min(1), Validators.max(180)]],
      level: ['', [Validators.required]],
      description: ['', [Validators.required]],
      timeLimit: ['', [Validators.required, Validators.max(8)]],
      memoryLimit: ['', [Validators.required, Validators.max(256)]],
      constructions: ['', [Validators.pattern('^[a-zA-Z,]*')]],
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
      input: ['', [Validators.required]],
      output: ['', [Validators.required]],
    });
  }

  public addItem(): void {
    this.codes.push(this.createItem());
  }

  public removeItem(): void {
    if (this.codes.length > 3) {
      this.codes.removeAt(this.codes.length - 1);
    }
  }

  // public onSubmit(): void {
  //   const { title, level, description, timeLimit, memoryLimit, constructions, codes } = this.form.value;

  //   const createTask: TaskCreateRq = {
  //     title,
  //     topicId: { id: this.topicId },
  //     level,
  //     description,
  //     options: {
  //       constructions: constructions.toString().replace(' ', '').split(','),
  //       timeLimit,
  //       memoryLimit,
  //     },
  //     tests: {
  //       input: [...codes.map(v => v.input)],
  //       output: [...codes.map(v => v.output)],
  //     },
  //   };

  //   if (this.form.valid) {
  //     this.taskControllerService
  //       .createTaskUsingPOST(createTask)
  //       .pipe(
  //         catchError(() => {
  //           this.error = true;
  //           return EMPTY;
  //         }),
  //         takeUntil(this.ngOnDestroy$),
  //       )
  //       .subscribe(() => {
  //         from(this.router.navigateByUrl(`/teacher/topic/${this.topicId}`));
  //       });
  //   }
  // }
}
