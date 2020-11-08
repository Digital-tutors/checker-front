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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { PageOfTaskResultDTO } from '../model/pageOfTaskResultDTO';
import { TaskResultDTO } from '../model/taskResultDTO';
import { TaskResultDTORequestView } from '../model/taskResultDTORequestView';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class TaskResultControllerService {

    protected basePath = '//localhost/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
     * getDecisionById
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDecisionByIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<TaskResultDTO>;
    public getDecisionByIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TaskResultDTO>>;
    public getDecisionByIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TaskResultDTO>>;
    public getDecisionByIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getDecisionByIdUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<TaskResultDTO>('get',`${this.basePath}/task/decision/decision/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDecisionsByUser
     * 
     * @param page page
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDecisionsByUserUsingGET(page?: number, observe?: 'body', reportProgress?: boolean): Observable<PageOfTaskResultDTO>;
    public getDecisionsByUserUsingGET(page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageOfTaskResultDTO>>;
    public getDecisionsByUserUsingGET(page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageOfTaskResultDTO>>;
    public getDecisionsByUserUsingGET(page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PageOfTaskResultDTO>('get',`${this.basePath}/task/decision/user/decisions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getDecisions
     * 
     * @param page page
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getDecisionsUsingGET(page?: number, observe?: 'body', reportProgress?: boolean): Observable<PageOfTaskResultDTO>;
    public getDecisionsUsingGET(page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageOfTaskResultDTO>>;
    public getDecisionsUsingGET(page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageOfTaskResultDTO>>;
    public getDecisionsUsingGET(page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PageOfTaskResultDTO>('get',`${this.basePath}/task/decision/all`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getTasksResultsByAuthorId
     * 
     * @param id id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTasksResultsByAuthorIdUsingGET(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<TaskResultDTO>>;
    public getTasksResultsByAuthorIdUsingGET(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TaskResultDTO>>>;
    public getTasksResultsByAuthorIdUsingGET(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TaskResultDTO>>>;
    public getTasksResultsByAuthorIdUsingGET(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getTasksResultsByAuthorIdUsingGET.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<TaskResultDTO>>('get',`${this.basePath}/task/decision/author/${encodeURIComponent(String(id))}/decisions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getTasksResultsByUserAndTask
     * 
     * @param task task
     * @param page page
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTasksResultsByUserAndTaskUsingGET(task: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<PageOfTaskResultDTO>;
    public getTasksResultsByUserAndTaskUsingGET(task: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageOfTaskResultDTO>>;
    public getTasksResultsByUserAndTaskUsingGET(task: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageOfTaskResultDTO>>;
    public getTasksResultsByUserAndTaskUsingGET(task: number, page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (task === null || task === undefined) {
            throw new Error('Required parameter task was null or undefined when calling getTasksResultsByUserAndTaskUsingGET.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PageOfTaskResultDTO>('get',`${this.basePath}/task/decision/task/${encodeURIComponent(String(task))}/decisions`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * saveDecision
     * 
     * @param body taskResults
     * @param taskId taskId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveDecisionUsingPOST(body: TaskResultDTORequestView, taskId: number, observe?: 'body', reportProgress?: boolean): Observable<TaskResultDTO>;
    public saveDecisionUsingPOST(body: TaskResultDTORequestView, taskId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<TaskResultDTO>>;
    public saveDecisionUsingPOST(body: TaskResultDTORequestView, taskId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<TaskResultDTO>>;
    public saveDecisionUsingPOST(body: TaskResultDTORequestView, taskId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveDecisionUsingPOST.');
        }

        if (taskId === null || taskId === undefined) {
            throw new Error('Required parameter taskId was null or undefined when calling saveDecisionUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<TaskResultDTO>('post',`${this.basePath}/task/decision/task/${encodeURIComponent(String(taskId))}/decision`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
