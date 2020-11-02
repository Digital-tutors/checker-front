import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SidebarService {
  private readonly sidebarSubject$: BehaviorSubject<any> = new BehaviorSubject(null);

  public get sidebar$(): Observable<any> {
    return this.sidebarSubject$.asObservable();
  }

  public setSidebar(sidebar: any): void {
    this.sidebarSubject$.next(sidebar);
  }
}
