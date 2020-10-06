import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ShareModule } from '@share/share.module';

import { AddTopicComponent } from './add/add.component';
import { TopicsComponent } from './topics.component';
import { RoutingModule } from './topics.routes';

@NgModule({
  declarations: [TopicsComponent, AddTopicComponent],
  imports: [
    CommonModule,
    RoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    ShareModule,
  ],
})
export class TopicsModule {}
