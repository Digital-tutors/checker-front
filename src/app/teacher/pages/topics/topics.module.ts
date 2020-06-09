import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AddTopicComponent } from './add/add.component';
import { TopicsComponent } from './topics.component';
import { RoutingModule } from './topics.routes';

@NgModule({
  declarations: [TopicsComponent, AddTopicComponent],
  imports: [CommonModule, RoutingModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class TopicsModule {}
