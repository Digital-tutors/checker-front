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
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
