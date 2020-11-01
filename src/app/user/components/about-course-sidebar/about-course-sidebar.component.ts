import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-course-sidebar',
  templateUrl: './about-course-sidebar.component.html',
  styleUrls: ['./about-course-sidebar.component.scss'],
})
export class AboutCourseSidebarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  public startCourse(): void {
    this.router.navigate([this.router.url, 'topic', 12312, 'lesson', 123123]);
  }
}
