import { NgModule } from '@angular/core';

import { ShareModule } from '@share/share.module';

import { RoutingModule } from './user.routes';

@NgModule({
  declarations: [],
  imports: [ShareModule, RoutingModule],
})
export class UserModule {}
