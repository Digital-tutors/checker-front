import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentsComponent } from './students.component';
import { RoutingModule } from './students.routes';

@NgModule({
  declarations: [StudentsComponent],
  imports: [CommonModule, RoutingModule],
})
export class StudentsModule {}
