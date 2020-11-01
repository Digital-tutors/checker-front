import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-course-sidebar',
  templateUrl: './lesson-sidebar.component.html',
  styleUrls: ['./lesson-sidebar.component.scss'],
})
export class LessonSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public startCourse(): void {
    this.router.navigate([this.router.url, 'topic', 12312, 'lesson', 123123]);
  }
}
