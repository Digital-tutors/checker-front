import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { StatusPipe } from '@share/pipes/status.pipe';

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
import {WysiwygEditorModule} from '@share/components/wysiwyg-editor/wysiwyg-editor.module';
import {LetDirective} from '@share/directories/let.directives';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

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

const MODULES: any[] = [
  WysiwygEditorModule
];

const PIPES: any[] = [FioPipe, LevelPipe, StatusPipe];

const DIRECTIVES: any[] = [LetDirective];

const MATERIAL_MODULES: any[] = [MatIconModule, MatProgressSpinnerModule, MatFormFieldModule, MatSelectModule];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ContenteditableModule, ...MODULES, ...MATERIAL_MODULES],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, ContenteditableModule, ...MODULES, ...MATERIAL_MODULES, ...COMPONENTS,  ...PIPES, ...DIRECTIVES],
})
export class ShareModule {}
