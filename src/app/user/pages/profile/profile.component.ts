import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { flatMap, takeUntil, tap } from 'rxjs/operators';

import { PeerResultsControllerService } from '@swagger/api/peerResultsController.service';
import { PeerReviewControllerService } from '@swagger/api/peerReviewController.service';
import { PeerTaskControllerService } from '@swagger/api/peerTaskController.service';
import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
import { PagePeerReviewVO } from '@swagger/model/pagePeerReviewVO';
import { PagePeerTaskResultsVO } from '@swagger/model/pagePeerTaskResultsVO';
import { PeerReviewVO } from '@swagger/model/peerReviewVO';
import { PeerTaskResultsVO } from '@swagger/model/peerTaskResultsVO';
import { TaskResultsVO } from '@swagger/model/taskResultsVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public taskResults: TaskResultsVO[];
  public peerTaskResults: PagePeerTaskResultsVO;
  public dataSource: any;
  private peerReviews: PagePeerReviewVO;
  public pageIndex: number = 0;

  public displayedColumns: string[] = ['taskNumber', 'attempt', 'language', 'messageOut', 'timeUsage', 'memoryUsage', 'status'];
  public displayedColumnsForPeerReview: string[] = [
    'peerTaskNumber',
    'receivedReviews',
    'postedReviews',
    'grade',
    'status',
    'variationRange',
    'correlationCoefficient',
    'concordanceOfKendall',
  ];

  constructor(
    private taskResultsControllerService: TaskResultsControllerService,
    private peerResultsControllerService: PeerResultsControllerService,
    private peerReviewControllerService: PeerReviewControllerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.taskResultsControllerService.getDecisionsByUserUsingGET().subscribe(taskResults => (this.taskResults = taskResults));
    this.peerResultsControllerService.getPeerDecisionsByUserUsingGET(this.pageIndex).subscribe(peerTaskResults => {
      this.peerTaskResults = peerTaskResults;
      this.dataSource = new MatTableDataSource<PeerTaskResultsVO>();
      this.dataSource.data = this.peerTaskResults.content;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.peerReviewControllerService.getReceivedReviewsByUserPerPageUsingGET(this.pageIndex).subscribe(peerReviews => (this.peerReviews = peerReviews));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public calculateVariationRange(peerTaskId: string): number {
    for (let elem of this.peerTaskResults.content) {
      if (elem.taskId.id == peerTaskId && elem.receivedReviews < 3) return 0;
    }

    let reviewGradesPerTask = [];

    for (let elem of this.peerReviews.content) {
      if (elem.taskId.id == peerTaskId) reviewGradesPerTask.push(elem.grade);
    }

    reviewGradesPerTask = reviewGradesPerTask.filter(v => !(v !== v)).slice(0, 3);

    return Math.max(...reviewGradesPerTask) - Math.min(...reviewGradesPerTask);
  }

  public calculateCorrelationCoefficient(peerTaskId: String): number {
    for (let elem of this.peerTaskResults.content) {
      if (elem.taskId.id == peerTaskId && elem.receivedReviews < 3) return 0;
    }

    let reviewGradesPerTask = [];
    for (let elem of this.peerReviews.content) {
      if (elem.taskId.id == peerTaskId) reviewGradesPerTask.push(elem.gradesPerCriterions);
    }

    reviewGradesPerTask = reviewGradesPerTask.filter(v => !(v !== v)).slice(0, 3);

    let sum = [];
    for (let i = 0; i < reviewGradesPerTask.length - 1; i++) {
      sum.push(ProfileComponent.correlationCoefficient(reviewGradesPerTask[i], reviewGradesPerTask[i + 1], reviewGradesPerTask[0].length));
    }

    return this.getMedian(sum);
  }

  private static correlationCoefficient(firstGrades: number[], secondGrades: number[], shape: number): number {
    let d = 0;
    let sum_d = 0;
    let coef = 0;

    for (let i = 0; i < shape; i++) {
      d = firstGrades[i] - secondGrades[i];
      sum_d += d * d;
    }
    coef = 1 - (6 * sum_d) / (shape * (shape * shape - 1));
    return coef;
  }

  public calculateConcordanceOfKendall(peerTaskId: string): number {
    for (let elem of this.peerTaskResults.content) {
      if (elem.taskId.id == peerTaskId && elem.receivedReviews < 3) return 0;
    }

    let reviewGradesPerTask = [];
    for (let elem of this.peerReviews.content) {
      if (elem.taskId.id == peerTaskId) reviewGradesPerTask.push(elem.gradesPerCriterions);
    }

    reviewGradesPerTask = reviewGradesPerTask.slice(0, 3);

    let r = 0;
    let columnSum = 0;
    let meanColumnSum = 0;

    for (let i = 0; i < reviewGradesPerTask.length; ++i) {
      for (let j = 0; j < reviewGradesPerTask[0].length; ++j) {
        columnSum += reviewGradesPerTask[i][j];
      }
      meanColumnSum = columnSum / reviewGradesPerTask.length;
      r += (columnSum - meanColumnSum) * (columnSum - meanColumnSum);
      columnSum = 0;
    }

    return (12 * r) / (reviewGradesPerTask.length * (Math.pow(reviewGradesPerTask[0].length, 3) - reviewGradesPerTask[0].length));
  }

  public getMedian(grades: number[]): number {
    const sorted = grades.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
  }

  public sortData(sort: Sort) {
    const data = this.peerTaskResults.content.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'peerTaskNumber':
          return this.compare(a.taskId.title, b.taskId.title, isAsc);
        case 'receivedReviews':
          return this.compare(a.receivedReviews, b.receivedReviews, isAsc);
        case 'postedReviews':
          return this.compare(a.postedReviews, b.postedReviews, isAsc);
        case 'grade':
          return this.compare(a.grade, b.grade, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }

  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  public onPageFired(event): void {
    this.route.paramMap
      .pipe(
        flatMap(() => this.peerReviewControllerService.getReceivedReviewsByUserPerPageUsingGET(event.pageIndex)),
        tap(peerReviews => (this.peerReviews = peerReviews)),
        flatMap(() => this.peerResultsControllerService.getPeerDecisionsByUserUsingGET(event.pageIndex)),
        takeUntil(this.ngOnDestroy$),
      )
      .subscribe(results => {
        this.dataSource.data = results.content;
        this.peerTaskResults = results;
        this.pageIndex = event.pageIndex;
      });
  }
}
