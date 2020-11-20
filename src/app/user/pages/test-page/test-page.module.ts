import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { TestPageComponent } from './test-page.component';
import { RoutingModule } from './test-page.routes';
import { QuestionComponent } from './components/question/question.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [TestPageComponent, QuestionComponent],
  imports: [ShareModule, RoutingModule, MatCheckboxModule],
})
export class TestPageModule {}
