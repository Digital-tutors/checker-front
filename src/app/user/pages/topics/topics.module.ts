import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TopicsComponent } from './topics.component';
import { RoutingModule } from './topics.routes';

@NgModule({
  declarations: [TopicsComponent],
  imports: [CommonModule, RoutingModule],
})
export class TopicsModule {}
