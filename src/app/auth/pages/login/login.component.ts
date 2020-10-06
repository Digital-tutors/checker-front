import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { EMPTY, from, Subject } from 'rxjs';
import { catchError, flatMap, takeUntil, tap } from 'rxjs/operators';

import { AuthControllerService } from '@swagger/api/authController.service';
import { UserVO } from '@swagger/model/userVO';

import { User } from '@store/actions/user.actions';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public form: FormGroup;

  public error: boolean;

  constructor(private fb: FormBuilder, private authControllerService: AuthControllerService, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.setForm();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private setForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.authControllerService
        .loginUsingPOST({
          ...this.form.value,
        })
        .pipe(
          tap((user: UserVO) => {
            localStorage.setItem(environment.token, user.token);
          }),
          flatMap((user: UserVO) => this.store.dispatch(new User.Set(user))),
          flatMap(() => from(this.router.navigateByUrl('/user/topics'))),
          catchError(() => {
            this.error = true;
            return EMPTY;
          }),
          takeUntil(this.ngOnDestroy$),
        )
        .subscribe();
    }
  }
}
