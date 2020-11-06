import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'courses/:courseId',
        loadChildren: () => import('./pages/course-page/course-page.module').then(m => m.CoursePageModule),
      },
      {
        path: 'courses/:courseId/lessons/:lessonId',
        loadChildren: () => import('./pages/lesson-page/lesson-page.module').then(m => m.LessonPageModule),
      },
      {
        path: 'topic/:topicId/add-task',
        loadChildren: () => import('./pages/task-page/task-page.module').then(m => m.TaskPageModule),
      },
      {
        path: 'topic/:topicId/test',
        loadChildren: () => import('./pages/test-page/test-page.module').then(m => m.TestPageModule),
      },
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
