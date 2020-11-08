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
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'courses/:courseId',
        loadChildren: () => import('./pages/course-page/course-page.module').then(m => m.CoursePageModule),
      },
      {
        path: 'topic/:topicId/lesson/:lessonId',
        loadChildren: () => import('./pages/lesson-page/lesson-page.module').then(m => m.LessonPageModule),
      },
      {
        path: 'topic/:topicId/task/:taskId',
        loadChildren: () => import('./pages/task-page/task-page.module').then(m => m.TaskPageModule),
      },
      {
        path: 'topic/:topicId/test/:testId',
        loadChildren: () => import('./pages/test-page/test-page.module').then(m => m.TestPageModule),
      },
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
