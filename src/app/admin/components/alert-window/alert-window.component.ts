import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

import {LessonAdminControllerService} from '@swagger/api/lessonAdminController.service';

@Component({
  selector: 'app-alert-window',
  templateUrl: './alert-window.component.html',
  styleUrls: ['./alert-window.component.scss'],
})
export class AlertWindowComponent implements OnInit {
  public taskId: number;

  constructor(
    private lessonAdminService: LessonAdminControllerService,
    private dialogRef: MatDialogRef<AlertWindowComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  public delete(): void {
    this.lessonAdminService.deleteLessonUsingDELETE(this.taskId).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
