import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  public editorOptions = { theme: 'vs-dark', language: 'javascript' };
  public code = 'function x() {\n\tconsole.log("Hello world!");\n}';

  constructor() {}

  ngOnInit(): void {}
}
