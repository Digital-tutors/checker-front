import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyTopicsComponent } from './my-topics/my-topics.component';
import { TopicsComponent } from './topics.component';

const routes: Routes = [
  {
    path: 'my',
    component: MyTopicsComponent,
  },
  {
    path: '',
    component: TopicsComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
