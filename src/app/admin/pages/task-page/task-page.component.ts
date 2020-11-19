import {Location} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import {EMPTY, Subject} from 'rxjs';
import {catchError, mergeMap, takeUntil, tap} from 'rxjs/operators';

import {TaskAdminControllerService} from '@swagger/api/taskAdminController.service';
import {TaskControllerService} from '@swagger/api/taskController.service';
import {TaskDTO} from '@swagger/model/taskDTO';
import {TaskDTORequestView} from '@swagger/model/taskDTORequestView';
import {TestsDTO} from '@swagger/model/testsDTO';

import {SidebarService} from '@share/services/sidebar.service';
import {AlertWindowComponent} from '../../components/alert-window/alert-window.component';
import {MatDialog} from '@angular/material/dialog';
import {AlertWindowTaskComponent} from '../../components/alert-window-task/alert-window-task.component';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent implements OnInit, OnDestroy {
  private ngOnDestroy$: Subject<void> = new Subject();

  public form: FormGroup;

  public topicId: number;
  public taskId: number;

  public levels: TaskDTO.LevelEnum[] = [TaskDTO.LevelEnum.EASY, TaskDTO.LevelEnum.MIDDLE, TaskDTO.LevelEnum.HARD];
  public publishStatuses: TaskDTO.StatusEnum[] = [TaskDTO.StatusEnum.UNPUBLISHED, TaskDTO.StatusEnum.PUBLISHED];

  public error: boolean;

  public editorOptions = {
    minimap: {
      enabled: false,
    },
    language: 'cpp',
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private sidebarService: SidebarService,
    private taskControllerService: TaskControllerService,
    private taskAdminControllerService: TaskAdminControllerService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.sidebarService.setSidebar(null);

    this.route.paramMap
      .pipe(
        tap(params => {
          this.topicId = Number(params.get('topicId'));
          this.taskId = Number(params.get('taskId'));
        }),
        mergeMap(() => this.taskControllerService.getTaskByIdUsingGET(this.taskId))
      )
      .subscribe((task: TaskDTO) => this.setForm(task));
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
  }

  private setForm(task: TaskDTO): void {
    this.form = this.fb.group({
      title: [task.title, [Validators.required, Validators.min(1), Validators.max(180)]],
      level: [task.level, [Validators.required]],
      status: [task.status, [Validators.required]],
      description: [task.description, [Validators.required]],
      timeLimit: [task.options?.timeLimit, [Validators.required, Validators.max(20)]],
      memoryLimit: [task.options?.memoryLimit, [Validators.required, Validators.max(512)]],
      constructions: [task.options?.constructions, [Validators.pattern('^[a-zA-Z,]*')]],
      codes: task.tests ? this.getCodesForm(task.tests) : this.fb.array([this.createItem()]),
    });
  }

  private getCodesForm(tests: TestsDTO): FormArray {
    const formArray: FormGroup[] = [];

    const maxLength = Math.max(tests.input?.length || 0, tests.output?.length || 0);

    for (let i = 0; i < maxLength; i++) {
      formArray.push(this.createItem(tests.input[i], tests.output[i]));
    }

    return this.fb.array(formArray.length > 0 ? formArray : [this.createItem()]);
  }

  get codes() {
    return this.form.get('codes') as FormArray;
  }

  public goBack(): void {
    this.location.back();
  }

  public createItem(input: string = '', output: string = ''): FormGroup {
    return this.fb.group({
      input: [input, []],
      output: [output, []],
    });
  }

  public addItem(): void {
    this.codes.push(this.createItem());
  }

  public removeItem(): void {
    if (this.codes.length > 3) {
      this.codes.removeAt(this.codes.length - 1);
    }
  }

  public onSubmit(): void {
    const { title, level, description, timeLimit, memoryLimit, constructions, codes } = this.form.value;

    const updateTask: TaskDTORequestView = {
      title,
      level,
      description,
      options: {
        constructions: constructions.toString().replace(' ', '').split(','),
        timeLimit,
        memoryLimit,
      },
      tests: {
        input: [...codes.map(v => v.input)],
        output: [...codes.map(v => v.output)],
      },
    };

    if (this.form.valid) {
      this.taskAdminControllerService
        .updateTaskUsingPUT(updateTask, this.taskId)
        .pipe(
          catchError(() => {
            this.error = true;
            return EMPTY;
          }),
          takeUntil(this.ngOnDestroy$),
        )
        .subscribe();
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AlertWindowTaskComponent, {
      width: '473px',
      height: '220px',
    });

    dialogRef.componentInstance.taskId = this.taskId;
  }

  public openSnackBar() {
    this.snackBar.open('Данные успешно сохранены', 'OK', {
      duration: 2000,
    });
  }
}
