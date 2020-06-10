import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeerTaskComponent } from './peer-task.component';

const routes: Routes = [
  {
    path: '',
    component: PeerTaskComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
