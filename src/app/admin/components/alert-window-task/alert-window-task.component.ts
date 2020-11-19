import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

import {TaskAdminControllerService} from '@swagger/api/taskAdminController.service';

@Component({
  selector: 'app-alert-window-task',
  templateUrl: './alert-window-task.component.html',
  styleUrls: ['./alert-window-task.component.scss'],
})
export class AlertWindowTaskComponent implements OnInit {
  public taskId: number;

  constructor(
    private taskAdminService: TaskAdminControllerService,
    private dialogRef: MatDialogRef<AlertWindowTaskComponent>,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  public delete(): void {
    this.taskAdminService.deleteTaskUsingDELETE(this.taskId).subscribe(() => {
      this.dialogRef.close();
      this.location.back();
    });
  }
}
