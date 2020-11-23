import {Component, Inject, OnInit} from '@angular/core';
import {TestingService} from '../../../testing/services/testing.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alert-window-test',
  templateUrl: './alert-window-test.component.html',
  styleUrls: ['./alert-window-test.component.scss'],
})
export class AlertWindowTestComponent implements OnInit {
  constructor(
    private testingService: TestingService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertWindowTestComponent>,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
  }

  public deleteTest(): void {
    this.testingService.deleteQuestion(this.data).subscribe();
    this.dialogRef.close();
  }
}
