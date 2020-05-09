import { Component, OnInit } from '@angular/core';

import { TopicControllerService } from '@swagger/api/topicController.service';
import { PageTopicVO } from '@swagger/model/pageTopicVO';

@Component({
  selector: 'app-user-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  topics: PageTopicVO;

  constructor(private topicControllerService: TopicControllerService) {}

  ngOnInit(): void {
    this.topicControllerService.getTopicsUsingGET(0).subscribe(topics => (this.topics = topics));
  }
}
