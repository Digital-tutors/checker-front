import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyCoursesComponent } from './my-courses.component';

const routes: Routes = [
  {
    path: '',
    component: MyCoursesComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
