import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { LessonPageComponent } from './lesson-page.component';
import { RoutingModule } from './lesson-page.routes';

@NgModule({
  declarations: [LessonPageComponent],
  imports: [ShareModule, CommonModule, RoutingModule],
})
export class LessonPageModule {}
