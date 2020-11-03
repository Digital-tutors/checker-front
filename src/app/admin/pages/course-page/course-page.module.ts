import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
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

@NgModule({
  declarations: [CoursePageComponent, DescriptionComponent, TopicsTasksComponent, ParticipantsComponent, SettingsComponent],
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
  ],
})
export class CoursePageModule {}
