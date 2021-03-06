import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AuthControllerService } from './api/authController.service';
import { CourseAdminControllerService } from './api/courseAdminController.service';
import { CourseControllerService } from './api/courseController.service';
import { CourseInteractionControllerService } from './api/courseInteractionController.service';
import { CourseRatingControllerService } from './api/courseRatingController.service';
import { LessonAdminControllerService } from './api/lessonAdminController.service';
import { LessonControllerService } from './api/lessonController.service';
import { LessonInteractionControllerService } from './api/lessonInteractionController.service';
import { LessonRatingControllerService } from './api/lessonRatingController.service';
import { TopicAdminControllerService } from './api/topicAdminController.service';
import { TopicControllerService } from './api/topicController.service';
import { TopicInteractionControllerService } from './api/topicInteractionController.service';
import { TopicRatingControllerService } from './api/topicRatingController.service';
import { UserControllerService } from './api/userController.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AuthControllerService,
    CourseAdminControllerService,
    CourseControllerService,
    CourseInteractionControllerService,
    CourseRatingControllerService,
    LessonAdminControllerService,
    LessonControllerService,
    LessonInteractionControllerService,
    LessonRatingControllerService,
    TopicAdminControllerService,
    TopicControllerService,
    TopicInteractionControllerService,
    TopicRatingControllerService,
    UserControllerService,
  ],
})
export class ApiModule {
  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: ApiModule, @Optional() http: HttpClient) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' + 'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
