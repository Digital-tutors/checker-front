import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.scss'],
})
export class LessonPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
