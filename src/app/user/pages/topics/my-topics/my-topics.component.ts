import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';

import { TopicControllerService } from '@swagger/api/topicController.service';
import { TopicVO } from '@swagger/model/topicVO';
import { UserVO } from '@swagger/model/userVO';

import { AppState } from '@store/app.state';

@Component({
  selector: 'app-user-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.scss'],
})
export class MyTopicsComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  @Select(AppState.user)
  public user$: Observable<UserVO>;

  public topics: TopicVO[];

  constructor(private topicControllerService: TopicControllerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.topicControllerService.getSubscribedTopicsUsingGET().subscribe(topics => (this.topics = topics));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
