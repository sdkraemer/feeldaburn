import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MeasurementsRoutingModule, routedComponents } from './measurements.routing';

import { AuthService } from '../auth/auth.service';



@NgModule({
  imports: [
    SharedModule,
    MeasurementsRoutingModule,
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    AuthService,
  ]
})
export class MeasurementsModule { }
