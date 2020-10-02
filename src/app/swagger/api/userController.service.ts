/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ /* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { PageUserVO } from '../model/pageUserVO';
import { UserCreateRq } from '../model/userCreateRq';
import { UserLoginRq } from '../model/userLoginRq';
import { UserVO } from '../model/userVO';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class UserControllerService {
  protected basePath = '//localhost:8080/';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   * getUserById
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUserByIdUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<UserVO>;
  public getUserByIdUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserVO>>;
  public getUserByIdUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserVO>>;
  public getUserByIdUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getUserByIdUsingGET.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<UserVO>('get', `${this.basePath}/user/${encodeURIComponent(String(id))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getUserByToken
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUserByTokenUsingGET(observe?: 'body', reportProgress?: boolean): Observable<UserVO>;
  public getUserByTokenUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserVO>>;
  public getUserByTokenUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserVO>>;
  public getUserByTokenUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<UserVO>('get', `${this.basePath}/profile`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getUsers
   *
   * @param page page
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getUsersUsingGET(page: number, observe?: 'body', reportProgress?: boolean): Observable<PageUserVO>;
  public getUsersUsingGET(page: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageUserVO>>;
  public getUsersUsingGET(page: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageUserVO>>;
  public getUsersUsingGET(page: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (page === null || page === undefined) {
      throw new Error('Required parameter page was null or undefined when calling getUsersUsingGET.');
    }

    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<PageUserVO>('get', `${this.basePath}/users`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * login
   *
   * @param body userLoginRq
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public loginUsingPOST(body: UserLoginRq, observe?: 'body', reportProgress?: boolean): Observable<UserVO>;
  public loginUsingPOST(body: UserLoginRq, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserVO>>;
  public loginUsingPOST(body: UserLoginRq, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserVO>>;
  public loginUsingPOST(body: UserLoginRq, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling loginUsingPOST.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<UserVO>('post', `${this.basePath}/api/login`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * signUp
   *
   * @param body userCreateRq
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public signUpUsingPOST(body: UserCreateRq, observe?: 'body', reportProgress?: boolean): Observable<UserVO>;
  public signUpUsingPOST(body: UserCreateRq, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserVO>>;
  public signUpUsingPOST(body: UserCreateRq, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserVO>>;
  public signUpUsingPOST(body: UserCreateRq, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling signUpUsingPOST.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<UserVO>('post', `${this.basePath}/sign-up`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
