import {Component, OnDestroy, OnInit} from '@angular/core';

import {combineLatest, EMPTY, Observable, Subject} from 'rxjs';

import shuffle from 'shuffle-list';

import {SidebarService} from '@share/services/sidebar.service';
import {TopicSidebarComponent} from '../../components/topic-sidebar/topic-sidebar.component';
import {QuestionInterface} from '../../../testing/services/interfaces/question.interface';
import {TestInterface} from '../../../testing/services/interfaces/test.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {TestingService} from '../../../testing/services/testing.service';
import {filter, first, map, mergeMap, tap} from 'rxjs/operators';
import {Select} from '@ngxs/store';
import {UserDTO} from '@swagger/model/userDTO';
import {RouteParamsService} from '@share/services/route-params/route-params.service';
import {AppState} from '@store/app.state';
import {ThemeTestsInterface} from '../../../testing/services/interfaces/theme-tests.interface';

@Component({
  selector: 'app-user-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public test: ThemeTestsInterface;
  public questions: QuestionInterface[] = [];

  public activeQuestion: QuestionInterface;
  public answerIndexes: string[] = [];

  public isDone: boolean;

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testingService: TestingService,
    private routeParamsService: RouteParamsService,
  ) {
  }

  ngOnInit(): void {
    this.user$.subscribe(item => console.log(item));
    this.activatedRoute.params.subscribe(params => this.routeParamsService.updateState(params));
    this.sidebarService.setSidebar(TopicSidebarComponent);
    this.getData();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private getData(): void {
    this.activatedRoute
      .params
      .pipe(
        mergeMap(params => this.testingService.getTest(params.topicId, params.testId)),
        tap(test => this.test = test),
        map((test: ThemeTestsInterface) => [...test.easy_questions, ...test.medium_questions, ...test.difficult_questions]),
        tap(questions => this.questions = questions),
      )
      .subscribe();
  }

  private postQuestionAnswer(question: QuestionInterface, answers: number[]): Observable<any> {
    return this.user$
      .pipe(
        first(),
        filter(user => !!user),
        mergeMap(user => this.testingService.postQuestionResult(
          user.id,
          this.test.theme_id,
          this.test.test_id,
          question.id,
          answers,
        ))
      );
  }

  public startQuiz(): void {
    this.activeQuestion = this.questions[0];
  }

  public answersMapToObj(answers: any): { index: string; answer: string }[] {
    return Object.entries(answers).map(([key, value]) => ({
      index: key,
      answer: value as string,
    }));
  }

  public handleCheckbox(item: { index: string; answer: string }): void {
    console.log(item);

    if (!this.answerIndexes.includes(item.index)) {
      this.answerIndexes.push(item.index);
    } else {
      console.log('ELSE');
      this.answerIndexes = this.answerIndexes.filter(i => i !== item.index);
    }
  }

  public submitQuestion(): void {
    const question = {...this.activeQuestion};
    const answers: number[] = this.answerIndexes.map(item => Number(item));

    const indexOfCurrentQuestion = this.questions.findIndex(({id}) => id === this.activeQuestion.id);
    this.activeQuestion = this.questions[indexOfCurrentQuestion + 1];
    this.answerIndexes = [];

    let observable$ = this.postQuestionAnswer(question, answers);

    if (!this.activeQuestion) {
      // Получать результат теста
      observable$ = observable$.pipe(
        mergeMap(() => EMPTY),
        tap(() => this.isDone = true),
      );
    }

    observable$.subscribe();
  }
}
