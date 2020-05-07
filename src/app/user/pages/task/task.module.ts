import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TaskComponent } from './task.component';
import { RoutingModule } from './task.routes';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule, RoutingModule],
})
export class TaskModule {}
