import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeerReviewComponent } from './peer-review.component';

const routes: Routes = [
  {
    path: '',
    component: PeerReviewComponent,
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
