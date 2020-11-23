import {Component, OnDestroy, OnInit} from '@angular/core';

import {combineLatest, Observable, of, Subject, throwError} from 'rxjs';

import shuffle from 'shuffle-list';

import {SidebarService} from '@share/services/sidebar.service';
import {TopicSidebarComponent} from '../../components/topic-sidebar/topic-sidebar.component';
import {QuestionVoInterface} from '../../../testing/services/interfaces/question-vo.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {TestingService} from '../../../testing/services/testing.service';
import {catchError, filter, first, map, mergeMap, tap} from 'rxjs/operators';
import {Select} from '@ngxs/store';
import {UserDTO} from '@swagger/model/userDTO';
import {RouteParamsService} from '@share/services/route-params/route-params.service';
import {AppState} from '@store/app.state';
import {TestVoInterface} from '../../../testing/services/interfaces/test-vo.interface';
import {LessonControllerService} from '@swagger/api/lessonController.service';
import {LessonDTO} from '@swagger/model/lessonDTO';
import {MatDialog} from '@angular/material/dialog';
import {TestWindowComponent} from '../../../admin/components/test-window/test-window.component';

@Component({
  selector: 'app-user-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public test: TestVoInterface;
  public questions: QuestionVoInterface[] = [];

  public activeQuestion: QuestionVoInterface;
  public answerIndexes: string[] = [];

  public isDone: boolean;
  public isStarted: boolean;

  public isLoading: boolean;

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
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('test') !== '1') {
      this.dialog.open(TestWindowComponent, {
        width: '600px',
      });
    }

    this.activatedRoute.params.subscribe(params => this.routeParamsService.updateState(params));
    this.sidebarService.setSidebar(TopicSidebarComponent);
    this.getData();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private getData(): void {
    this.isLoading = true;
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

  private getTest(params: any): Observable<TestVoInterface> {
    return this.testingService.getTest(params.topicId, params.testId).pipe(
      tap(test => {
        this.test = test;
        this.questions = test.difficult_questions.slice(0);
        this.activeQuestion = shuffle(test.difficult_questions)[0];
        this.isLoading = false;
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
    this.isLoading = true;
    return this.getUser().pipe(
      mergeMap(user => this.testingService.getTestResult(
        Number(this.activatedRoute.snapshot.params.topicId),
        this.activatedRoute.snapshot.params.testId,
        user.id,
      )),
      mergeMap((results: any) => (results.lessons.length > 0 ? combineLatest<LessonDTO[]>(results.lessons.map(item => this.lessonControllerService.getLessonByIdUsingGET(item))) : of([]).pipe(first())).pipe(
        tap((lessons: LessonDTO[]) => {
          this.result = results;
          this.lessons = this.uniqueLessons(lessons);
          this.isDone = true;
          this.isLoading = false;
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

  private postQuestionAnswer(question: QuestionVoInterface, answers: number[]): Observable<QuestionVoInterface> {
    return this.getUser()
      .pipe(
        mergeMap(user => this.testingService.postQuestionResult({
          user_id: user.id,
          theme_id: this.test.theme_id,
          test_id: this.test._id,
          question: question._id,
          user_answers: answers,
        })),
        tap((data: QuestionVoInterface) => {
          if (data._id) {
            this.activeQuestion = data;
          } else {
            this.activeQuestion = null;
          }
        }),
      );
  }

  public startQuiz(): void {
    this.isDone = false;
    this.isStarted = true;
    this.activeQuestion = shuffle(this.questions)[0];
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

    this.answerIndexes = [];

    this.postQuestionAnswer(question, answers)
      .pipe(
        tap(() => {
          if (!this.activeQuestion) {
            this.isLoading = true;
            this.isStarted = false;
          }
        }),
        mergeMap(() => {
          let observable$: Observable<any> = of(this.activeQuestion).pipe(first());
          if (!this.activeQuestion) {
            observable$ = this.getTestResults();
          }
          return observable$;
        })
      )
      .subscribe();
  }

  public toLesson(lesson: LessonDTO): void {
    let id = lesson.id;

    if (lesson.level === 'EASY') {
      id = lesson.replacements.find(({level}) => level === 'MIDDLE').id || id;
    } else if (lesson.level === 'MIDDLE') {
      id = lesson.replacements.find(({level}) => level === 'HARD').id || id;
    }

    this.router.navigate(['user/courses', this.routeParamsService.routeParamsSnapshot().courseId, 'topic', this.routeParamsService.routeParamsSnapshot().topicId, 'lesson', id]);
  }
}
