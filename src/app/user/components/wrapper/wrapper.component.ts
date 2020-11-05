import { Component, OnDestroy, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { filter, first, flatMap, takeUntil } from 'rxjs/operators';

import { UserControllerService } from '@swagger/api/userController.service';
import { UserDTO } from '@swagger/model/userDTO';

import { User } from '@store/actions/user.actions';
import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  constructor(private userControllerService: UserControllerService, private store: Store) {}

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private getUser(): void {
    this.user$
      .pipe(
        first(),
        filter((user: UserDTO) => !user),
        flatMap(() => this.userControllerService.getProfileUsingGET()),
        flatMap((user: UserDTO) => this.store.dispatch(new User.Set(user))),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe();
  }
}
