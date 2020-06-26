import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';
import { flatMap, takeUntil, tap } from 'rxjs/operators';

import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
import { PageTaskResultsVO } from '@swagger/model/pageTaskResultsVO';
import { TaskResultsVO } from '@swagger/model/taskResultsVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public taskResults: PageTaskResultsVO;

  public pageNumber = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public dataSource = new MatTableDataSource<TaskResultsVO>();

  public displayedColumns: string[] = ['taskNumber', 'attempt', 'language', 'messageOut', 'timeUsage', 'memoryUsage', 'status'];

  constructor(private taskResultsControllerService: TaskResultsControllerService) {}

  ngOnInit(): void {
    this.taskResultsControllerService.getDecisionsByUserUsingGET(this.pageNumber).subscribe(taskResults => {
      this.dataSource.data = taskResults.content;
      this.taskResults = taskResults;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  public onPageFired(event): void {
    console.log(event.pageIndex);
    this.taskResultsControllerService.getDecisionsByUserUsingGET(event.pageIndex).subscribe(taskResults => {
      this.dataSource.data = taskResults.content;
      this.taskResults = taskResults;

      console.log(taskResults.totalElements);
      this.dataSource.paginator = this.paginator;
    });
  }
}
