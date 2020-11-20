import {Component, OnDestroy, OnInit} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';

import shuffle from 'shuffle-list';

import {SidebarService} from '../../../share/services/sidebar.service';
import {TopicSidebarComponent} from '../../components/topic-sidebar/topic-sidebar.component';
import {QuestionInterface} from '../../../testing/services/interfaces/question.interface';
import {TestInterface} from '../../../testing/services/interfaces/test.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {TestingService} from '../../../testing/services/testing.service';
import {map, mergeMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public test: TestInterface;
  public questions: QuestionInterface[] = [];

  public activeQuestion: QuestionInterface;
  public answerIndexes: string[];

  public isDone: boolean;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testingService: TestingService
  ) {
  }

  ngOnInit(): void {
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
        mergeMap((test: TestInterface) => {
          const questions: string[] = [...test.easy_questions, ...test.medium_questions, ...test.difficult_questions];

          return combineLatest(questions.map(id => this.testingService.getQuestion(id))).pipe(
            map(data => shuffle(data)),
          );
        }),
        tap(questions => this.questions = questions),
      )
      .subscribe();
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
    if (!this.answerIndexes.includes(item.index)) {
      this.answerIndexes.push(item.index);
    } else {
      this.answerIndexes = this.answerIndexes.filter(i => i === item.index);
    }
  }

  public submitQuestion(): void {
    const question = { ...this.activeQuestion };
    const answers: number[] = this.answerIndexes.map(item => Number(item));
    const indexOfCurrentQuestion = this.questions.findIndex(({ id }) => id === this.activeQuestion.id);
    this.activeQuestion = this.questions[indexOfCurrentQuestion + 1];

    if (!this.activeQuestion) {
      this.isDone = true;
    }

    // сделать что-то с answers
  }
}
