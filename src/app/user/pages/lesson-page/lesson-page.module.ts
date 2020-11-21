import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { LessonPageComponent } from './lesson-page.component';
import { RoutingModule } from './lesson-page.routes';
import {MatSelectModule} from '@angular/material/select';
import {SelectDifficultyModule} from '../../components/select-difficulty/select-difficulty.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [LessonPageComponent],
  imports: [ShareModule, SelectDifficultyModule, CommonModule, RoutingModule, MatSnackBarModule],
})
export class LessonPageModule {}
