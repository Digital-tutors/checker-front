import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { AboutCourseSidebarComponent } from './components/about-course-sidebar/about-course-sidebar.component';
import { LayoutComponent } from './components/layout/layout.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { TopicSidebarComponent } from './components/topic-sidebar/topic-sidebar.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './user.routes';

@NgModule({
  declarations: [LayoutComponent, WrapperComponent, AboutCourseSidebarComponent, TopicSidebarComponent, QuizComponent],
  imports: [ShareModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
  exports: [],
  providers: [],
})
export class UserModule {}
