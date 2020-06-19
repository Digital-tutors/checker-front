import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddTaskComponent } from './add-task/add.component';
import { TopicComponent } from './topic.component';

const routes: Routes = [
  {
    path: '',
    component: TopicComponent,
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
