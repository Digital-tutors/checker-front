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
        pathMatch: 'prefix',
        loadChildren: () => import('./pages/topics/topics.module').then(m => m.TopicsModule),
      },
      {
        path: 'topic/:id',
        pathMatch: 'full',
        loadChildren: () => import('./pages/topic/topic.module').then(m => m.TopicModule),
      },
      {
        path: 'topic/:id/add-task',
        pathMatch: 'full',
        loadChildren: () => import('./pages/add-task/add-task.module').then(m => m.AddTaskModule),
      },
      {
        path: 'topic/:id/students',
        pathMatch: 'full',
        loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule),
      },
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
