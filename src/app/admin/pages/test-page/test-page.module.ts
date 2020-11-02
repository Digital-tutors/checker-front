import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { TestPageComponent } from './test-page.component';
import { RoutingModule } from './test-page.routes';

@NgModule({
  declarations: [TestPageComponent],
  imports: [ShareModule, RoutingModule],
})
export class TestPageModule {}
