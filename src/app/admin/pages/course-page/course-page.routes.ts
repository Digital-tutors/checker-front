import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DescriptionComponent } from './components/description/description.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TopicsTasksComponent } from './components/topics-tasks/topics-tasks.component';
import { CoursePageComponent } from './course-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DescriptionComponent,
      },
      {
        path: 'topics-tasks',
        pathMatch: 'full',
        component: TopicsTasksComponent,
      },
      {
        path: 'participants',
        pathMatch: 'full',
        component: ParticipantsComponent,
      },
      {
        path: 'settings',
        pathMatch: 'full',
        component: SettingsComponent,
      },
    ],
  },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
