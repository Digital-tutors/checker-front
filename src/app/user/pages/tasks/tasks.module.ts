import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { TasksComponent } from './tasks.component';
import { RoutingModule } from './tasks.routes';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, RoutingModule, MatCardModule, MatIconModule, MatButtonModule],
})
export class TasksModule {}
