import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss'],
})
export class CoursePageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
