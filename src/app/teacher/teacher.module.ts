import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { LayoutComponent } from './components/layout/layout.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './teacher.routes';

@NgModule({
  declarations: [LayoutComponent, WrapperComponent],
  imports: [ShareModule, RoutingModule],
})
export class TeacherModule {}
