import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LessonPageComponent } from './lesson-page.component';

const routes: Routes = [
  {
    path: '',
    component: LessonPageComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
