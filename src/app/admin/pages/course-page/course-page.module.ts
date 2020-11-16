import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { DescriptionComponent } from './components/description/description.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TopicsTasksComponent } from './components/topics-tasks/topics-tasks.component';
import { CoursePageComponent } from './course-page.component';
import { RoutingModule } from './course-page.routes';

import { MonacoEditorModule } from 'ngx-monaco-editor';
import {ResultsComponent} from './components/results/results.component';
import {TaskSourceCodeWindowComponent} from '../../components/task-source-code-window/task-source-code-window.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [TaskSourceCodeWindowComponent, CoursePageComponent, DescriptionComponent, TopicsTasksComponent, ParticipantsComponent, ResultsComponent, SettingsComponent],
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
    MatPaginatorModule,
    ShareModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MonacoEditorModule,
  ],
  entryComponents: [TaskSourceCodeWindowComponent],
})
export class CoursePageModule {}
