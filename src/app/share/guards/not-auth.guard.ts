import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  private checkForAuth(): boolean {
    if (localStorage.getItem(environment.token)) {
      this.router.navigate(['']);
    }

    return !localStorage.getItem(environment.token);
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkForAuth();
  }
  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkForAuth();
  }
}
