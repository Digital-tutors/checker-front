import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import {QuestionInterface} from './interfaces/question.interface';
import {ResultInterface} from './interfaces/result.interface';
import {TestInterface} from './interfaces/test.interface';
import {ThemeTestsInterface} from './interfaces/theme-tests.interface';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  private url = 'http://scatproject.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public getTest(topicId: number, testId: string): Observable<TestInterface> {
    return this.http.get<TestInterface>(`${this.url}/test/${testId}/${topicId}`);
  }

  public postQuestionResult(result: ResultInterface): Observable<any> {
    return this.http.post(`${this.url}/question/results`, result);
  }

  public getTestResult(topicId: number, testId: string, userId: number): Observable<any> {
    return this.http.get(`${this.url}/test/results/${topicId}/${testId}/${userId}`);
  }

  public getTestResultByTopic(topicId: number, userId: number): Observable<any> {
    return this.http.get(`${this.url}/test/results/${topicId}/${userId}`);
  }

  public getTestsByThemeId(themeId: number): Observable<ThemeTestsInterface[]> {
    return this.http.get<ThemeTestsInterface[]>(`${this.url}/test/${themeId}/all`);
  }
}
