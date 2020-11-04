import { NgModule } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

import { ShareModule } from '../../../share/share.module';

import { LessonPageComponent } from './lesson-page.component';
import { RoutingModule } from './lesson-page.routes';

@NgModule({
  declarations: [LessonPageComponent],
  imports: [ShareModule, RoutingModule, MatExpansionModule, MatDividerModule],
})
export class LessonPageModule {}
