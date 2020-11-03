import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { AboutCourseSidebarComponent } from './components/about-course-sidebar/about-course-sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LessonPageSidebarComponent } from './components/lesson-page-sidebar/lesson-page-sidebar.component';
import { AdminComponent } from './components/quiz/admin.component';
import { TopicSidebarComponent } from './components/topic-sidebar/topic-sidebar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './admin.routes';

@NgModule({
  declarations: [LayoutComponent, WrapperComponent, AboutCourseSidebarComponent, TopicSidebarComponent, AdminComponent, LessonPageSidebarComponent],
  imports: [ShareModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
  exports: [],
})
export class AdminModule {}
