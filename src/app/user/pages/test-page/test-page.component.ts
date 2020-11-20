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
}
