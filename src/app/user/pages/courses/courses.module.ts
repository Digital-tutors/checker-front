import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatOptionModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {ShareModule} from '@share/share.module';

import {CoursesComponent} from './courses.component';
import {RoutingModule} from './courses.routes';

import {MonacoEditorModule} from 'ngx-monaco-editor';
import {TeacherWindowComponent} from '../../../admin/components/teacher-window/teacher-window.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [CoursesComponent, TeacherWindowComponent],
  imports: [
    CommonModule,
    RoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MonacoEditorModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    ShareModule,
  ],
})
export class CoursesModule {
}
