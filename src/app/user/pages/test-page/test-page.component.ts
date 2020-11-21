import {Component, OnDestroy, OnInit} from '@angular/core';

import {combineLatest, Observable, of, Subject} from 'rxjs';

import shuffle from 'shuffle-list';

import {SidebarService} from '@share/services/sidebar.service';
import {TopicSidebarComponent} from '../../components/topic-sidebar/topic-sidebar.component';
import {QuestionInterface} from '../../../testing/services/interfaces/question.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {TestingService} from '../../../testing/services/testing.service';
import {catchError, filter, first, map, mergeMap, tap} from 'rxjs/operators';
import {Select} from '@ngxs/store';
import {UserDTO} from '@swagger/model/userDTO';
import {RouteParamsService} from '@share/services/route-params/route-params.service';
import {AppState} from '@store/app.state';
import {ThemeTestsInterface} from '../../../testing/services/interfaces/theme-tests.interface';
import {LessonControllerService} from '@swagger/api/lessonController.service';
import {LessonDTO} from '@swagger/model/lessonDTO';

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

  public result: any;
  public lessons: LessonDTO[];

  @Select(AppState.user)
  public user$: Observable<UserDTO>;

  constructor(
    private sidebarService: SidebarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private testingService: TestingService,
    private routeParamsService: RouteParamsService,
    private lessonControllerService: LessonControllerService,
  ) {
  }

  ngOnInit(): void {
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
        mergeMap(params => {
          return this.getTestResults().pipe(
            mergeMap(() => this.getTest(params)),
            catchError(() => this.getTest(params)),
          );
        }),
      )
      .subscribe();
  }

  private getTest(params: any): Observable<any> {
    return this.testingService.getTest(params.topicId, params.testId).pipe(
      tap(test => this.test = test),
      map((test: ThemeTestsInterface) => [...test.easy_questions, ...test.medium_questions, ...test.difficult_questions]),
      tap(questions => {
        this.questions = shuffle(questions);
      }),
    );
  }

  private uniqueLessons(lessons: LessonDTO[]): LessonDTO[] {
    const ids: number[] = [];
    return lessons.map(item => {
      if (!ids.includes(item.id)) {
        ids.push(item.id);
        return item;
      }
      return null;
    }).filter(item => item !== null);
  }

  private getTestResults(): Observable<any> {
    return this.getUser().pipe(
      mergeMap(user => this.testingService.getTestResult(
        Number(this.activatedRoute.snapshot.params.topicId),
        this.activatedRoute.snapshot.params.testId,
        user.id,
      )),
      tap(console.log),
      mergeMap((results: any) => (results.lessons.length > 0 ? combineLatest<LessonDTO[]>(results.lessons.map(item => this.lessonControllerService.getLessonByIdUsingGET(item))) : of([]).pipe(first())).pipe(
        tap((lessons: LessonDTO[]) => {
          this.result = results;
          this.lessons = this.uniqueLessons(lessons);
          this.isDone = true;
        }),
      ))
    );
  }

  private getUser(): Observable<UserDTO> {
    return this.user$
      .pipe(
        filter(user => !!user),
        first(),
      );
  }

  private postQuestionAnswer(question: QuestionInterface, answers: number[]): Observable<any> {
    return this.getUser()
      .pipe(
        mergeMap(user => this.testingService.postQuestionResult({
          user_id: user.id,
          theme_id: this.test.theme_id,
          test_id: this.test._id,
          question: question._id,
          user_answers: answers,
        })),
      );
  }

  public startQuiz(): void {
    this.isDone = false;
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
      this.answerIndexes = this.answerIndexes.filter(i => i !== item.index);
    }
  }

  public submitQuestion(): void {
    const question = {...this.activeQuestion};
    const answers: number[] = this.answerIndexes.map(item => Number(item));

    const indexOfCurrentQuestion = this.questions.findIndex(({ _id }) => _id === this.activeQuestion._id);
    this.activeQuestion = this.questions[indexOfCurrentQuestion + 1];
    this.answerIndexes = [];

    let observable$ = this.postQuestionAnswer(question, answers);

    if (!this.activeQuestion) {
      observable$ = observable$.pipe(
        mergeMap(() => this.getTestResults()),
      );
    }

    observable$.subscribe();
  }

  public toLesson(lessonId: number): void {
    this.router.navigate(['user/courses', this.routeParamsService.routeParamsSnapshot().courseId, 'topic', this.routeParamsService.routeParamsSnapshot().topicId, 'lesson', lessonId]);
  }
}
