import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

import {CourseAdminControllerService} from '@swagger/api/courseAdminController.service';

@Component({
  selector: 'app-alert-window-course',
  templateUrl: './alert-window-course.component.html',
  styleUrls: ['./alert-window-course.component.scss'],
})
export class AlertWindowCourseComponent implements OnInit {
  public taskId: number;

  constructor(
    private courseAdminService: CourseAdminControllerService,
    private dialogRef: MatDialogRef<AlertWindowCourseComponent>,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  public delete(): void {
    this.courseAdminService.deleteCourseUsingDELETE(this.taskId).subscribe(() => {
      this.dialogRef.close();
      this.location.back();
    });
  }
}
