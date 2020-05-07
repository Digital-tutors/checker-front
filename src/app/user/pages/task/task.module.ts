import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from '../../components/header/header.component';

import { TaskComponent } from './task.component';
import { RoutingModule } from './task.routes';

@NgModule({
  declarations: [TaskComponent, HeaderComponent],
  imports: [CommonModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule],
})
export class TaskModule {}
