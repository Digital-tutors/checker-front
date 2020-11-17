import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { ShareModule } from '@share/share.module';

import { TestPageComponent } from './test-page.component';
import { RoutingModule } from './test-page.routes';

@NgModule({
  declarations: [TestPageComponent],
  imports: [
    CommonModule,
    RoutingModule,
    ShareModule,
    RoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule
  ],
})
export class TestPageModule {}
