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

import { PageTaskResultsVO } from '../model/pageTaskResultsVO';
import { TaskResultsCreateRq } from '../model/taskResultsCreateRq';
import { TaskResultsVO } from '../model/taskResultsVO';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class TaskResultsControllerService {
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
   * deleteDecision
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteDecisionUsingDELETE(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteDecisionUsingDELETE(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteDecisionUsingDELETE(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteDecisionUsingDELETE(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteDecisionUsingDELETE.');
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

    return this.httpClient.request<any>('delete', `${this.basePath}/decision/${encodeURIComponent(String(id))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getDecisionById
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getDecisionByIdUsingGET(id: string, observe?: 'body', reportProgress?: boolean): Observable<TaskResultsVO>;
  public getDecisionByIdUsingGET(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TaskResultsVO>>;
  public getDecisionByIdUsingGET(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TaskResultsVO>>;
  public getDecisionByIdUsingGET(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getDecisionByIdUsingGET.');
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

    return this.httpClient.request<TaskResultsVO>('get', `${this.basePath}/decision/${encodeURIComponent(String(id))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getDecisionsByUser
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getDecisionsByUserUsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<TaskResultsVO>>;
  public getDecisionsByUserUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TaskResultsVO>>>;
  public getDecisionsByUserUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TaskResultsVO>>>;
  public getDecisionsByUserUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<TaskResultsVO>>('get', `${this.basePath}/user/decisions`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getDecisions
   *
   * @param page page
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getDecisionsUsingGET(page: number, observe?: 'body', reportProgress?: boolean): Observable<PageTaskResultsVO>;
  public getDecisionsUsingGET(page: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageTaskResultsVO>>;
  public getDecisionsUsingGET(page: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageTaskResultsVO>>;
  public getDecisionsUsingGET(page: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (page === null || page === undefined) {
      throw new Error('Required parameter page was null or undefined when calling getDecisionsUsingGET.');
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

    return this.httpClient.request<PageTaskResultsVO>('get', `${this.basePath}/decisions`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getTasksByAuthorId
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTasksByAuthorIdUsingGET1(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<TaskResultsVO>>;
  public getTasksByAuthorIdUsingGET1(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TaskResultsVO>>>;
  public getTasksByAuthorIdUsingGET1(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TaskResultsVO>>>;
  public getTasksByAuthorIdUsingGET1(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getTasksByAuthorIdUsingGET1.');
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

    return this.httpClient.request<Array<TaskResultsVO>>('get', `${this.basePath}/author/${encodeURIComponent(String(id))}/decisions`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getTasksByUserAndTask
   *
   * @param task task
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getTasksByUserAndTaskUsingGET(task: string, observe?: 'body', reportProgress?: boolean): Observable<Array<TaskResultsVO>>;
  public getTasksByUserAndTaskUsingGET(task: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TaskResultsVO>>>;
  public getTasksByUserAndTaskUsingGET(task: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TaskResultsVO>>>;
  public getTasksByUserAndTaskUsingGET(task: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (task === null || task === undefined) {
      throw new Error('Required parameter task was null or undefined when calling getTasksByUserAndTaskUsingGET.');
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

    return this.httpClient.request<Array<TaskResultsVO>>('get', `${this.basePath}/task/${encodeURIComponent(String(task))}/decisions`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * saveDecision
   *
   * @param body taskResultsCreateRq
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public saveDecisionUsingPOST(body: TaskResultsCreateRq, observe?: 'body', reportProgress?: boolean): Observable<TaskResultsVO>;
  public saveDecisionUsingPOST(body: TaskResultsCreateRq, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TaskResultsVO>>;
  public saveDecisionUsingPOST(body: TaskResultsCreateRq, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TaskResultsVO>>;
  public saveDecisionUsingPOST(body: TaskResultsCreateRq, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling saveDecisionUsingPOST.');
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

    return this.httpClient.request<TaskResultsVO>('post', `${this.basePath}/decision`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
