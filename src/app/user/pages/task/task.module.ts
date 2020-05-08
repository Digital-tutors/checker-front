import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { HeaderComponent } from '../../components/header/header.component';

import { TaskComponent } from './task.component';
import { RoutingModule } from './task.routes';

@NgModule({
  declarations: [TaskComponent, HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, RoutingModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule],
})
export class TaskModule {}
