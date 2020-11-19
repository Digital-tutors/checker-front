import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';

import {TopicAdminControllerService} from '@swagger/api/topicAdminController.service';

@Component({
  selector: 'app-alert-window-topic',
  templateUrl: './alert-window-topic.component.html',
  styleUrls: ['./alert-window-topic.component.scss'],
})
export class AlertWindowTopicComponent implements OnInit {
  public taskId: number;

  constructor(
    private topicAdminService: TopicAdminControllerService,
    private dialogRef: MatDialogRef<AlertWindowTopicComponent>,
    private location: Location
  ) {
  }

  ngOnInit(): void {
  }

  public delete(): void {
    this.topicAdminService.deleteTopicUsingDELETE(this.taskId).subscribe(() => {
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
