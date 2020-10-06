import { Component, OnInit } from '@angular/core';

import { TopicControllerService } from '@swagger/api/topicController.service';
import { PageOfTopicDTO } from '@swagger/model/pageOfTopicDTO';
import { PageTopicVO } from '@swagger/model/pageTopicVO';

@Component({
  selector: 'app-user-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  public topics: PageOfTopicDTO;

  constructor(private topicControllerService: TopicControllerService) {}

  ngOnInit(): void {
    this.topicControllerService.getTopicsUsingGET(0).subscribe(topics => (this.topics = topics));
  }
}
