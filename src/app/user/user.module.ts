import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShareModule } from '@share/share.module';

import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { RoutingModule } from './user.routes';

@NgModule({
  declarations: [LayoutComponent, WrapperComponent, HeaderComponent],
  imports: [ShareModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule],
  exports: [HeaderComponent],
})
export class UserModule {}
