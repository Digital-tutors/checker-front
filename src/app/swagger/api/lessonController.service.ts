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

import { LessonDTO } from '../model/lessonDTO';
import { LessonDTOShortResView } from '../model/lessonDTOShortResView';
import { PageOfLessonDTO } from '../model/pageOfLessonDTO';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class LessonControllerService {
  protected basePath = '//164.90.237.175:8080/';
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
   * getLessonById
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getLessonByIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<LessonDTO>;
  public getLessonByIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<LessonDTO>>;
  public getLessonByIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<LessonDTO>>;
  public getLessonByIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getLessonByIdUsingGET.');
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
      headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<LessonDTO>('get', `${this.basePath}/lesson/${encodeURIComponent(String(id))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getLessonByTopicId
   *
   * @param topicId topicId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getLessonByTopicIdUsingGET(topicId: number, observe?: 'body', reportProgress?: boolean): Observable<Array<LessonDTOShortResView>>;
  public getLessonByTopicIdUsingGET(topicId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<LessonDTOShortResView>>>;
  public getLessonByTopicIdUsingGET(topicId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<LessonDTOShortResView>>>;
  public getLessonByTopicIdUsingGET(topicId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (topicId === null || topicId === undefined) {
      throw new Error('Required parameter topicId was null or undefined when calling getLessonByTopicIdUsingGET.');
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
      headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<LessonDTOShortResView>>('get', `${this.basePath}/lesson/${encodeURIComponent(String(topicId))}/all`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * getLessons
   *
   * @param page page
   * @param stage stage
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getLessonsUsingGET(page: number, stage?: string, observe?: 'body', reportProgress?: boolean): Observable<PageOfLessonDTO>;
  public getLessonsUsingGET(page: number, stage?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageOfLessonDTO>>;
  public getLessonsUsingGET(page: number, stage?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageOfLessonDTO>>;
  public getLessonsUsingGET(page: number, stage?: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (page === null || page === undefined) {
      throw new Error('Required parameter page was null or undefined when calling getLessonsUsingGET.');
    }

    let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }
    if (stage !== undefined && stage !== null) {
      queryParameters = queryParameters.set('stage', <any>stage);
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys && this.configuration.apiKeys['Authorization']) {
      headers = headers.set('Authorization', this.configuration.apiKeys['Authorization']);
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['*/*'];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<PageOfLessonDTO>('get', `${this.basePath}/lesson/all`, {
      params: queryParameters,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}