import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ShareModule } from '@share/share.module';

import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RoutingModule } from './auth.routes';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [ShareModule, RoutingModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class AuthModule {}
