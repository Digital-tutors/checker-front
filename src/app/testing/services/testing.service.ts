import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';

import {ResultInterface} from './interfaces/result.interface';
import {TestInterface} from './interfaces/test.interface';
import {QuestionInterface} from './interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class TestingService {
  private url = 'http://scatproject.herokuapp.com';

  constructor(private http: HttpClient) { }

  public getTest(topicId: number, testId: string): Observable<TestInterface> {
    return this.http.get<TestInterface>(`${this.url}/test/${topicId}/${testId}`);
  }

  public getQuestion(questionId: string): Observable<QuestionInterface> {
    return this.http.get<QuestionInterface>(`${this.url}/question-details/${questionId}`);
  }

  public postQuestionAnswer(userId: number, topicId: number, testId: number, questionId: string, answers: number[]): Observable<any> {
    return this.http.post<any>(`${this.url}/question-result/${userId}/${topicId}/${testId}/${questionId}`, {
      user_id: userId,
      theme_id: topicId,
      test_id: testId,
      question: questionId,
      user_answers: answers,
    });
  }

  public postTestResult(result: ResultInterface): Observable<any> {
    return this.http.post(`${this.url}/user-test-result/${result.user_id}/${result.theme_id}/${result.test_id}`, result);
  }

  public getTestResult(result: ResultInterface): Observable<any> {
    return this.http.get(`${this.url}/user-test-result/${result.user_id}/${result.theme_id}/${result.test_id}`);
  }

  public getTestsByThemeId(themeId: number): Observable<any> {
    return this.http.get(`${this.url}/tests-in-theme/${themeId}`);
  }
}
