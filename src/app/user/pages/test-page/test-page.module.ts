import { NgModule } from '@angular/core';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import { ShareModule } from '@share/share.module';

import {TestWindowComponent} from '../../../admin/components/test-window/test-window.component';

import { QuestionComponent } from './components/question/question.component';
import { TestPageComponent } from './test-page.component';
import { RoutingModule } from './test-page.routes';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [TestPageComponent, QuestionComponent, TestWindowComponent],
  imports: [ShareModule, RoutingModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatButtonModule],
})
export class TestPageModule {}
