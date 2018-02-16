import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MeasurementsRoutingModule, routedComponents } from './measurements.routing';

import { AuthNewService } from '../auth/auth-new.service';



@NgModule({
  imports: [
    SharedModule,
    MeasurementsRoutingModule,
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    AuthNewService,
  ]
})
export class MeasurementsModule { }
