import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { WorkoutPickerRoutingModule, routedComponents } from './workout-picker.routing';

import { GuideService } from '../../guides/guide.service';

import { WorkoutTypeComponent } from './workout-type.component';
import { StrengthTrainingPickerComponent } from './strength-training-picker.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    WorkoutPickerRoutingModule
  ],
  declarations: [
    routedComponents,
    WorkoutTypeComponent,
    StrengthTrainingPickerComponent
  ],
  providers: [
    GuideService
  ],
  exports: [
    
  ]
})
export class WorkoutPickerModule {}