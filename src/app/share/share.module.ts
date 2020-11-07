import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { AboutCourseSidebarComponent } from './components/about-course-sidebar/about-course-sidebar.component';
import { ButtonComponent } from './components/button/button.component';
import { HighlightedContainerComponent } from './components/highlighted-container/highlighted-container.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { InfoContainerComponent } from './components/info-container/info-container.component';
import { RatingComponent } from './components/rating/rating.component';
import { ShadowContainerComponent } from './components/shadow-container/shadow-container.component';
import { TwoBoxGridComponent } from './components/two-box-grid/two-box-grid.component';
import { FioPipe } from './pipes/fio.pipe';
import { LevelPipe } from './pipes/level.pipe';

import { ContenteditableModule } from '@ng-stack/contenteditable';

const COMPONENTS: any[] = [
  ImageCardComponent,
  InfoContainerComponent,
  TwoBoxGridComponent,
  RatingComponent,
  ButtonComponent,
  ShadowContainerComponent,
  HighlightedContainerComponent,
  AboutCourseSidebarComponent,
];

const PIPES: any[] = [FioPipe, LevelPipe];

const MATERIAL_MODULES: any[] = [MatIconModule];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ContenteditableModule, ...MATERIAL_MODULES],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, ContenteditableModule, ...COMPONENTS, ...MATERIAL_MODULES, ...PIPES],
})
export class ShareModule {}
