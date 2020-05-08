import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TaskControllerService } from '@swagger/api/taskController.service';
import { TaskVO } from '@swagger/model/taskVO';

@Component({
  selector: 'app-user-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();
  private task: TaskVO;

  public editorOptions = { theme: 'vs-dark', language: 'cpp' };
  public code = '/*\n\tЭто мини-редактор VS Code.\n\tПисать код вы можете ниже или вместо комментария\n*/\n\n';

  public codeForm: FormGroup;

  constructor(private fb: FormBuilder, private taskControllerService: TaskControllerService) {}

  ngOnInit(): void {
    this.setForm();

    this.taskControllerService.getTaskByIdUsingGET('').pipe(tap(task => (this.task = task)));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private setForm(): void {
    this.codeForm = this.fb.group({
      code: [this.code, [Validators.required]],
    });
  }

  private getHandledCode(): string {
    return this.codeForm.get('code').value.split('    ').join('\t');
  }

  public sendCode(): void {
    console.log(this.getHandledCode());
  }

  public selectLanguage(language: string): void {
    this.editorOptions = {
      ...this.editorOptions,
      language,
    };
  }
}
