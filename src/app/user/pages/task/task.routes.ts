import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
