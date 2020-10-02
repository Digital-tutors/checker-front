import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem(environment.token);

    const headers: any = {};

    console.log('Token: ', token);

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    console.log('Request Method: ', req.method);
    console.log('Headers: ', headers);

    const authReq = req.clone({ setHeaders: { ...headers } });
    console.log('AuthReq: ', authReq);

    return next.handle(authReq);
  }
}
