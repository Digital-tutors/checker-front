import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import {AlertWindowTaskComponent} from './components/alert-window-task/alert-window-task.component';
import { AlertWindowTestComponent } from './components/alert-window-test/alert-window-test.component';
import {AlertWindowTopicComponent} from './components/alert-window-topic/alert-window-topic.component';
import { AlertWindowComponent } from './components/alert-window/alert-window.component';
import { EditTopicSidebarComponent } from './components/edit-topic-sidebar/edit-topic-sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LessonPageSidebarComponent } from './components/lesson-page-sidebar/lesson-page-sidebar.component';
import { TestPageSidebarComponent } from './components/test-page-sidebar/test-page-sidebar.component';
import { TopicSidebarComponent } from './components/topic-sidebar/topic-sidebar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './admin.routes';


@NgModule({
  declarations: [
    LayoutComponent,
    WrapperComponent,
    TopicSidebarComponent,
    LessonPageSidebarComponent,
    AlertWindowComponent,
    AlertWindowTaskComponent,
    AlertWindowTopicComponent,
    TestPageSidebarComponent,
    EditTopicSidebarComponent,
    AlertWindowTestComponent,
  ],
  imports: [
    ShareModule,
    RoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  exports: [],
  entryComponents: [AlertWindowComponent],
})
export class AdminModule {}
