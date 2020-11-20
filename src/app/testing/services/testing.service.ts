import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  public postTestResult(result: ResultInterface): Observable<any> {
    return this.http.post(`${this.url}/user-test-result/${result.user_id}/${result.theme_id}/${result.test_id}`, result);
  }

  public getTestResult(result: ResultInterface): Observable<any> {
    return this.http.get(`${this.url}/user-test-result/${result.user_id}/${result.theme_id}/${result.test_id}`);
  }
}
