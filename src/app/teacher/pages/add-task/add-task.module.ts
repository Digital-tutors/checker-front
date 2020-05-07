import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddTaskComponent } from './add-task.component';
import { RoutingModule } from './add-task.routes';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [CommonModule, RoutingModule],
})
export class AddTaskModule {}
