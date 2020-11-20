import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { TestPageComponent } from './test-page.component';
import { RoutingModule } from './test-page.routes';
import { QuestionComponent } from './components/question/question.component';

@NgModule({
  declarations: [TestPageComponent, QuestionComponent],
  imports: [ShareModule, RoutingModule],
})
export class TestPageModule {}
