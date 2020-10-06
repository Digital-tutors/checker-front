import { Component, OnInit } from '@angular/core';

import { TopicControllerService } from '@swagger/api/topicController.service';
import { PageOfTopicDTO } from '@swagger/model/pageOfTopicDTO';

@Component({
  selector: 'app-teacher-topics',
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
