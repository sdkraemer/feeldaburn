import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkoutTrackerRoutingModule, routedComponents } from './workout-tracker.routing';

import { GuideService } from '../../guides/guide.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkoutTrackerRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    GuideService
  ],
  exports: [
    
  ]
})
export class WorkoutTrackerModule {}