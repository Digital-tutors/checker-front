import { Component, OnInit } from '@angular/core';

import { TopicControllerService } from '@swagger/api/topicController.service';
import { TopicVO } from '@swagger/model/topicVO';

@Component({
  selector: 'app-teacher-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  public topics: TopicVO[];

  constructor(private topicControllerService: TopicControllerService) {}

  ngOnInit(): void {
    this.topicControllerService.getMyTopicsUsingGET().subscribe(topics => (this.topics = topics));
  }
}
