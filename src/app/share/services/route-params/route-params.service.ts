import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { RouteParamMapInterface } from '@share/services/route-params/interfaces/route-param-map.interface';

@Injectable({ providedIn: 'root' })
export class RouteParamsService {
  private routeParamState$: BehaviorSubject<RouteParamMapInterface> = new BehaviorSubject({});

  public routeParams$: Observable<RouteParamMapInterface> = this.routeParamState$.asObservable();

  public updateState(params: RouteParamMapInterface): void {
    this.routeParamState$.next({
      ...this.routeParamState$.value,
      ...params,
    });
  }

  public routeParamsSnapshot(): RouteParamMapInterface {
    return this.routeParamState$.value;
  }
}
