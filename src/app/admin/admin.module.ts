import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { AboutCourseSidebarComponent } from './components/about-course-sidebar/about-course-sidebar.component';
import { AlertWindowComponent } from './components/alert-window/alert-window.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LessonPageSidebarComponent } from './components/lesson-page-sidebar/lesson-page-sidebar.component';
import { AdminComponent } from './components/quiz/admin.component';
import { TopicSidebarComponent } from './components/topic-sidebar/topic-sidebar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './admin.routes';

@NgModule({
  declarations: [
    LayoutComponent,
    WrapperComponent,
    AboutCourseSidebarComponent,
    TopicSidebarComponent,
    AdminComponent,
    LessonPageSidebarComponent,
    AlertWindowComponent,
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
  ],
  exports: [],
  entryComponents: [AlertWindowComponent],
})
export class AdminModule {}
