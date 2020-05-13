import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TopicComponent } from './topic.component';

const routes: Routes = [
  {
    path: '',
    component: TopicComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
