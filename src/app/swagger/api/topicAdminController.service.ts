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

import { TopicDTO } from '../model/topicDTO';
import { TopicDTORequestView } from '../model/topicDTORequestView';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';

@Injectable()
export class TopicAdminControllerService {
  protected basePath = '//localhost/';
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
   * createTopic
   *
   * @param body topicDTO
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createTopicUsingPOST(body: TopicDTORequestView, observe?: 'body', reportProgress?: boolean): Observable<TopicDTO>;
  public createTopicUsingPOST(body: TopicDTORequestView, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TopicDTO>>;
  public createTopicUsingPOST(body: TopicDTORequestView, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TopicDTO>>;
  public createTopicUsingPOST(body: TopicDTORequestView, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createTopicUsingPOST.');
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
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<TopicDTO>('post', `${this.basePath}/admin/topic`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * deleteTopic
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteTopicUsingDELETE(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteTopicUsingDELETE(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteTopicUsingDELETE(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteTopicUsingDELETE(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteTopicUsingDELETE.');
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

    return this.httpClient.request<any>('delete', `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * linkWithCourse
   *
   * @param courseId courseId
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public linkWithCourseUsingPUT(courseId: number, id: number, observe?: 'body', reportProgress?: boolean): Observable<TopicDTO>;
  public linkWithCourseUsingPUT(courseId: number, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TopicDTO>>;
  public linkWithCourseUsingPUT(courseId: number, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TopicDTO>>;
  public linkWithCourseUsingPUT(courseId: number, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (courseId === null || courseId === undefined) {
      throw new Error('Required parameter courseId was null or undefined when calling linkWithCourseUsingPUT.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling linkWithCourseUsingPUT.');
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

    return this.httpClient.request<TopicDTO>(
      'put',
      `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/course/${encodeURIComponent(String(courseId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      },
    );
  }

  /**
   * makeArchived
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public makeArchivedUsingPOST3(id: number, observe?: 'body', reportProgress?: boolean): Observable<TopicDTO>;
  public makeArchivedUsingPOST3(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TopicDTO>>;
  public makeArchivedUsingPOST3(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TopicDTO>>;
  public makeArchivedUsingPOST3(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling makeArchivedUsingPOST3.');
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

    return this.httpClient.request<TopicDTO>('post', `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/archived`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * makePublished
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public makePublishedUsingPOST3(id: number, observe?: 'body', reportProgress?: boolean): Observable<TopicDTO>;
  public makePublishedUsingPOST3(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TopicDTO>>;
  public makePublishedUsingPOST3(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TopicDTO>>;
  public makePublishedUsingPOST3(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling makePublishedUsingPOST3.');
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

    return this.httpClient.request<TopicDTO>('post', `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/published`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * makeUnpublished
   *
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public makeUnpublishedUsingPOST3(id: number, observe?: 'body', reportProgress?: boolean): Observable<TopicDTO>;
  public makeUnpublishedUsingPOST3(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TopicDTO>>;
  public makeUnpublishedUsingPOST3(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TopicDTO>>;
  public makeUnpublishedUsingPOST3(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling makeUnpublishedUsingPOST3.');
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

    return this.httpClient.request<TopicDTO>('post', `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/unpublished`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * updateTopicAddons
   *
   * @param addonId addonId
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateTopicAddonsUsingPUT(addonId: number, id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateTopicAddonsUsingPUT(addonId: number, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateTopicAddonsUsingPUT(addonId: number, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateTopicAddonsUsingPUT(addonId: number, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (addonId === null || addonId === undefined) {
      throw new Error('Required parameter addonId was null or undefined when calling updateTopicAddonsUsingPUT.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateTopicAddonsUsingPUT.');
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

    return this.httpClient.request<any>('put', `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/addon/${encodeURIComponent(String(addonId))}`, {
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }

  /**
   * updateTopicExtensions
   *
   * @param extensionId extensionId
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateTopicExtensionsUsingPUT(extensionId: number, id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateTopicExtensionsUsingPUT(extensionId: number, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateTopicExtensionsUsingPUT(extensionId: number, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateTopicExtensionsUsingPUT(extensionId: number, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (extensionId === null || extensionId === undefined) {
      throw new Error('Required parameter extensionId was null or undefined when calling updateTopicExtensionsUsingPUT.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateTopicExtensionsUsingPUT.');
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

    return this.httpClient.request<any>(
      'put',
      `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/extension/${encodeURIComponent(String(extensionId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      },
    );
  }

  /**
   * updateTopicReplacements
   *
   * @param id id
   * @param replacementId replacementId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateTopicReplacementsUsingPUT(id: number, replacementId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateTopicReplacementsUsingPUT(id: number, replacementId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public updateTopicReplacementsUsingPUT(id: number, replacementId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateTopicReplacementsUsingPUT(id: number, replacementId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateTopicReplacementsUsingPUT.');
    }

    if (replacementId === null || replacementId === undefined) {
      throw new Error('Required parameter replacementId was null or undefined when calling updateTopicReplacementsUsingPUT.');
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

    return this.httpClient.request<any>(
      'put',
      `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/replacement/${encodeURIComponent(String(replacementId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      },
    );
  }

  /**
   * updateTopicSimplifications
   *
   * @param id id
   * @param simplificationId simplificationId
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateTopicSimplificationsUsingPUT(id: number, simplificationId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public updateTopicSimplificationsUsingPUT(
    id: number,
    simplificationId: number,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>;
  public updateTopicSimplificationsUsingPUT(id: number, simplificationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public updateTopicSimplificationsUsingPUT(id: number, simplificationId: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateTopicSimplificationsUsingPUT.');
    }

    if (simplificationId === null || simplificationId === undefined) {
      throw new Error('Required parameter simplificationId was null or undefined when calling updateTopicSimplificationsUsingPUT.');
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

    return this.httpClient.request<any>(
      'put',
      `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}/simplification/${encodeURIComponent(String(simplificationId))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      },
    );
  }

  /**
   * updateTopic
   *
   * @param body topicDTO
   * @param id id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateTopicUsingPUT(body: TopicDTORequestView, id: number, observe?: 'body', reportProgress?: boolean): Observable<TopicDTO>;
  public updateTopicUsingPUT(body: TopicDTORequestView, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TopicDTO>>;
  public updateTopicUsingPUT(body: TopicDTORequestView, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TopicDTO>>;
  public updateTopicUsingPUT(body: TopicDTORequestView, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateTopicUsingPUT.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateTopicUsingPUT.');
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
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<TopicDTO>('put', `${this.basePath}/admin/topic/${encodeURIComponent(String(id))}`, {
      body: body,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
    });
  }
}
