import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { AddTaskComponent } from './add-task/add.component';
import { TopicComponent } from './topic.component';
import { RoutingModule } from './topic.routes';

import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [TopicComponent, AddTaskComponent],
  imports: [
    CommonModule,
    RoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MonacoEditorModule,
  ],
})
export class TopicModule {}
