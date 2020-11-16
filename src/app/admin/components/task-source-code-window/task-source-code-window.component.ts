import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {TaskResultDTO} from '@swagger/model/taskResultDTO';
import {TaskDTO} from '@swagger/model/taskDTO';

@Component({
  selector: 'app-task-source-code-window',
  templateUrl: './task-source-code-window.component.html',
  styleUrls: ['./task-source-code-window.component.scss'],
})
export class TaskSourceCodeWindowComponent implements OnInit {
  public editorOptions = { language: 'javascript', readOnly: true };
  public sourceCode: string;
  public task: TaskDTO;
  public result: TaskResultDTO;

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.setTaskResult();
  }

  private setTaskResult(): void {
    console.log(this.data);
    this.task = this.data.task;
    this.result = this.data.result;
    this.sourceCode = this.data.result.sourceCode;
    this.editorOptions.language = this.data.result.language;
  }
}
