import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { from } from 'rxjs';
import { flatMap, tap } from 'rxjs/operators';

import { User } from '@store/actions/user.actions';

import { environment } from '@environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
}
