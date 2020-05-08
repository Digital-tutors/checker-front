import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  arr = Array.from(Array(25).keys());
  constructor() {}

  ngOnInit(): void {}
}
