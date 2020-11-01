import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { ImageCardComponent } from '@share/components/image-card/image-card.component';
import { InfoContainerComponent } from '@share/components/info-container/info-container.component';

const COMPONENTS: any[] = [ImageCardComponent, InfoContainerComponent];

const MATERIAL_MODULES: any[] = [MatIconModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...MATERIAL_MODULES],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, ...COMPONENTS, ...MATERIAL_MODULES],
})
export class ShareModule {}
