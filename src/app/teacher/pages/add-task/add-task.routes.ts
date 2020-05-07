import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './add-task.component';

const routes: Routes = [
  {
    path: '',
    component: AddTaskComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
