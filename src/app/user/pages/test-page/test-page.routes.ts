import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestPageComponent } from './test-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestPageComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
