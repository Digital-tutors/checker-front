import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';

import { from, Observable, Subject } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { UserVO } from '@swagger/model/userVO';

import { User } from '@store/actions/user.actions';
import { AppState } from '@store/app.state';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-header-teacher',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class TeacherHeaderComponent implements OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  constructor(private store: Store, private router: Router) {}

  public logout(): void {
    this.store
      .dispatch(new User.Set(null))
      .pipe(
        tap(() => localStorage.removeItem(environment.token)),
        flatMap(() => from(this.router.navigateByUrl('/auth/login'))),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
