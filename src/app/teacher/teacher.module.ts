import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { TeacherHeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './teacher.routes';

@NgModule({
  declarations: [LayoutComponent, WrapperComponent, TeacherHeaderComponent],
  imports: [ShareModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class TeacherModule {}
