import { Component, OnDestroy, OnInit } from '@angular/core';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';

import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
