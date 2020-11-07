import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { EMPTY, from, Subject } from 'rxjs';
import { catchError, mergeMap, takeUntil, tap } from 'rxjs/operators';

import { AuthControllerService } from '@swagger/api/authController.service';
import { UserControllerService } from '@swagger/api/userController.service';
import { TokenVO } from '@swagger/model/tokenVO';
import { UserDTO } from '@swagger/model/userDTO';

import { User } from '@store/actions/user.actions';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public form: FormGroup;

  public error: boolean;

  constructor(
    private fb: FormBuilder,
    private authControllerService: AuthControllerService,
    private userControllerService: UserControllerService,
    private router: Router,
    private store: Store,
  ) {}

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
        .registerUsingPOST({
          ...this.form.value,
        })
        .pipe(
          tap((data: TokenVO) => {
            localStorage.setItem(environment.token, data.token);
          }),
          mergeMap(() => this.userControllerService.getProfileUsingGET()),
          mergeMap((user: UserDTO) => this.store.dispatch(new User.Set(user))),
          mergeMap(() => from(this.router.navigateByUrl('/user/courses'))),
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
