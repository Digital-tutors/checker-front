import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MyTopicsComponent } from './my-topics/my-topics.component';
import { TopicsComponent } from './topics.component';
import { RoutingModule } from './topics.routes';

@NgModule({
  declarations: [TopicsComponent, MyTopicsComponent],
  imports: [CommonModule, RoutingModule, MatButtonModule, MatCardModule, MatIconModule, MatIconModule],
})
export class TopicsModule {}
