import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot } from '@angular/router';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router) {}

  private checkForAuth(): boolean {
    if (!localStorage.getItem(environment.token)) {
      this.router.navigate(['/auth']);
    }

    return !!localStorage.getItem(environment.token);
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkForAuth();
  }
  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkForAuth();
  }

  public canLoad(...args: any[]): boolean {
    return this.checkForAuth();
  }
}
