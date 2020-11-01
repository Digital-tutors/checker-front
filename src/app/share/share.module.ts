import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from './components/button/button.component';
import { HighlightedContainerComponent } from './components/highlighted-container/highlighted-container.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { InfoContainerComponent } from './components/info-container/info-container.component';
import { RatingComponent } from './components/rating/rating.component';
import { ShadowContainerComponent } from './components/shadow-container/shadow-container.component';
import { TwoBoxGridComponent } from './components/two-box-grid/two-box-grid.component';

const COMPONENTS: any[] = [
  ImageCardComponent,
  InfoContainerComponent,
  TwoBoxGridComponent,
  RatingComponent,
  ButtonComponent,
  ShadowContainerComponent,
  HighlightedContainerComponent,
];

const MATERIAL_MODULES: any[] = [MatIconModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...MATERIAL_MODULES],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, ...COMPONENTS, ...MATERIAL_MODULES],
})
export class ShareModule {}
