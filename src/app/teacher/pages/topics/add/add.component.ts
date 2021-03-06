import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EMPTY, from, Subject } from 'rxjs';
import { catchError, flatMap, takeUntil, tap } from 'rxjs/operators';

import { TopicAdminControllerService } from '@swagger/api/topicAdminController.service';

@Component({
  selector: 'app-add-topic',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddTopicComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public form: FormGroup;

  public error: boolean;

  constructor(private fb: FormBuilder, private topicAdminControllerService: TopicAdminControllerService, private router: Router) {}

  ngOnInit(): void {
    this.setForm();
  }

  private setForm(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.min(1), Validators.max(180)]],
      accessType: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.topicAdminControllerService
        .createTopicUsingPOST({
          ...this.form.value,
        })
        .pipe(
          catchError(() => {
            this.error = true;
            return EMPTY;
          }),
          takeUntil(this.ngOnDestroy$),
        )
        .subscribe(topic => {
          from(this.router.navigateByUrl(`/teacher/topic/${topic.id}`));
        });
    }
  }
}
