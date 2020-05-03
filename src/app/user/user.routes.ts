import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'topics',
    pathMatch: 'full',
    loadChildren: () => import('./pages/topics/topics.module').then(m => m.TopicsModule),
  },
  {
    path: 'topics/:id/tasks',
    pathMatch: 'full',
    loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule),
  },
  {
    path: 'topics/:id/tasks/:taskId',
    loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule),
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
