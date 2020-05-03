import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'topics',
        pathMatch: 'full',
        loadChildren: () => import('./pages/topics/topics.module').then(m => m.TopicsModule),
      },
      {
        path: 'topics/:id/add-task',
        pathMatch: 'full',
        loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskModule),
      },
      {
        path: 'topics/:id/students',
        pathMatch: 'full',
        loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
      },
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
