import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatTreeModule } from '@angular/material/tree';

import { PeerReviewComponent } from './peer-review.component';
import { RoutingModule } from './peer-review.routes';

import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [PeerReviewComponent],
  imports: [
    CommonModule,
    RoutingModule,
    MatSliderModule,
    AngularEditorModule,
    MatTreeModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class PeerReviewModule {}
