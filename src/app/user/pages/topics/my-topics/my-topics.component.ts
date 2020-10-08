import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Select } from '@ngxs/store';

import { Observable, Subject } from 'rxjs';

import { TopicControllerService } from '@swagger/api/topicController.service';
import { PageOfTopicDTO } from '@swagger/model/pageOfTopicDTO';
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

  public topics: PageOfTopicDTO;

  constructor(private topicControllerService: TopicControllerService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.topicControllerService.getTopicsUsingGET(0).subscribe(topics => (this.topics = topics));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }
}
