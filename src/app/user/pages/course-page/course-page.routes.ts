import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursePageComponent } from './course-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
