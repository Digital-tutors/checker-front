import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from '../../components/header/header.component';

import { TaskComponent } from './task.component';
import { RoutingModule } from './task.routes';

import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [TaskComponent, HeaderComponent],
  imports: [CommonModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MonacoEditorModule, ReactiveFormsModule],
})
export class TaskModule {}
