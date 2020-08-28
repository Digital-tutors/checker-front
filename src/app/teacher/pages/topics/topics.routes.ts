import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTopicComponent } from './add/add.component';
import { TopicsComponent } from './topics.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddTopicComponent,
  },
  {
    path: '',
    component: TopicsComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
