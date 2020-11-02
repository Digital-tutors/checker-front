import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-sidebar',
  templateUrl: './topic-sidebar.component.html',
  styleUrls: ['./topic-sidebar.component.scss'],
})
export class TopicSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public startCourse(): void {
    this.router.navigate([this.router.url, 'topic', 12312, 'lesson', 123123]);
  }
}
