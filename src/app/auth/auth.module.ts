import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoutingModule } from './auth.routes';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [ShareModule, RoutingModule],
})
export class AuthModule {}
