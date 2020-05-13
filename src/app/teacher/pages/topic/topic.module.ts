import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { TopicComponent } from './topic.component';
import { RoutingModule } from './topic.routes';

@NgModule({
  declarations: [TopicComponent],
  imports: [CommonModule, RoutingModule, MatCardModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
})
export class TopicModule {}
