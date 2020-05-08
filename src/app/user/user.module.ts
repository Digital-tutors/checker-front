import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './user.routes';

@NgModule({
  declarations: [LayoutComponent, WrapperComponent, HeaderComponent],
  imports: [ShareModule, RoutingModule, MatToolbarModule, MatIconModule],
  exports: [HeaderComponent],
})
export class UserModule {}
