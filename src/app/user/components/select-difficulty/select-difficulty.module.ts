import { NgModule } from '@angular/core';
import {SelectDifficultyComponent} from './select-difficulty.component';
import {ShareModule} from '@share/share.module';

@NgModule({
  declarations: [SelectDifficultyComponent],
  imports: [
    ShareModule,
  ],
  exports: [SelectDifficultyComponent],
})
export class SelectDifficultyModule { }
