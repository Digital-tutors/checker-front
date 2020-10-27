import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskPageComponent } from './task-page.component';

const routes: Routes = [
  {
    path: '',
    component: TaskPageComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
