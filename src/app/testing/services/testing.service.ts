import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import {QuestionVoInterface} from './interfaces/question-vo.interface';
import {ResultInterface} from './interfaces/result.interface';
import {TestVoInterface} from './interfaces/test-vo.interface';
import {TestDtoInterface} from './interfaces/test-dto.interface';
import {QuestionDtoInterface} from './interfaces/question-dto.interface';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  private url = 'http://scatproject.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public getTest(topicId: number, testId: string): Observable<TestVoInterface> {
    return this.http.get<TestVoInterface>(`${this.url}/test/${testId}/${topicId}`);
  }

  public getTestAdmin(topicId: number, testId: string): Observable<TestVoInterface> {
    return this.http.get<TestVoInterface>(`${this.url}/test/${testId}/${topicId}/admin`);
  }

  public postQuestionResult(result: ResultInterface): Observable<QuestionVoInterface> {
    return this.http.post<QuestionVoInterface>(`${this.url}/question/results`, result);
  }

  public getTestResult(topicId: number, testId: string, userId: number): Observable<any> {
    return this.http.get(`${this.url}/test/results/${topicId}/${testId}/${userId}`);
  }

  public getTestResultByTopic(topicId: number, userId: number): Observable<any> {
    return this.http.get(`${this.url}/test/results/${topicId}/${userId}`);
  }

  public getTestsByThemeId(themeId: number): Observable<TestVoInterface[]> {
    return this.http.get<TestVoInterface[]>(`${this.url}/test/${themeId}/all`);
  }

  public createTest(data: TestDtoInterface): Observable<TestVoInterface> {
    return this.http.post<TestVoInterface>(`${this.url}/test`, data);
  }

  public updateTest(id: string, data: TestDtoInterface): Observable<TestVoInterface> {
    return this.http.put<TestVoInterface>(`${this.url}/test/${id}`, data);
  }

  public deleteTest(id: string): Observable<any> {
    return this.http.delete(`${this.url}/test/${id}`);
  }

  public createQuestion(data: QuestionDtoInterface): Observable<QuestionVoInterface> {
    return this.http.post<QuestionVoInterface>(`${this.url}/question`, data);
  }

  public updateQuestion(id: string, data: QuestionDtoInterface): Observable<QuestionVoInterface> {
    return this.http.put<QuestionVoInterface>(`${this.url}/question/${id}`, data);
  }

  public deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.url}/question/${id}`);
  }
}
