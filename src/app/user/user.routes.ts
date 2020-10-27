import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WrapperComponent } from './components/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'profile',
        pathMatch: 'full',
        loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'courses',
        pathMatch: 'full',
        loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule),
      },
      {
        path: 'courses/:courseId',
        pathMatch: 'full',
        loadChildren: () => import('./pages/course-page/course-page.module').then(m => m.CoursePageModule),
      },
      {
        path: 'courses/:courseId/topic/:topicId/lesson/:lessonId', // Занятие
        pathMatch: 'full',
        loadChildren: () => import('./pages/test-page/test-page.module').then(m => m.TestPageModule),
      },
      {
        path: 'courses/:courseId/topic/:topicId/test/:testId',
        pathMatch: 'full',
        loadChildren: () => import('./pages/test-page/test-page.module').then(m => m.TestPageModule),
      },
      {
        path: 'courses/:courseId/topic/:topicId/task/:taskId', // Практическое задание
        pathMatch: 'full',
        loadChildren: () => import('./pages/test-page/test-page.module').then(m => m.TestPageModule),
      },
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
