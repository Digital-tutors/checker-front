import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
