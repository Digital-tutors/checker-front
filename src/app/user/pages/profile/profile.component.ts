import { Component, OnDestroy, OnInit } from '@angular/core';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';

import { TaskResultsControllerService } from '@swagger/api/taskResultsController.service';
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

  public taskResults: TaskResultsVO[];

  public displayedColumns: string[] = ['taskNumber', 'attempt', 'language', 'messageOut', 'timeUsage', 'memoryUsage', 'status'];

  constructor(private taskResultsControllerService: TaskResultsControllerService) {}

  ngOnInit(): void {
    this.taskResultsControllerService.getDecisionsByUserUsingGET().subscribe(taskResults => (this.taskResults = taskResults));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
