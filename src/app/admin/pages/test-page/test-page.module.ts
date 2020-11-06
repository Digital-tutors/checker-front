import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class TestPageModule {}
