import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { MeasurementsComponent }   from './measurements.component';
import { MeasurementComponent }   from './measurement.component';

const routes: Routes = [
  { 
    path: 'measurements', component: MeasurementsComponent, children: [
      { path: ':id', component: MeasurementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeasurementsRoutingModule { }

export const routedComponents = [MeasurementsComponent, MeasurementComponent];  