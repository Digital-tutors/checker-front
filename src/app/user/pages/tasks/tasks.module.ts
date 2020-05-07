import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TasksComponent } from './tasks.component';
import { RoutingModule } from './tasks.routes';

@NgModule({
  declarations: [TasksComponent],
  imports: [CommonModule, RoutingModule],
})
export class TasksModule {}
