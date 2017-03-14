import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WorkoutTrackerRoutingModule, routedComponents } from './workout-tracker.routing';

import { GuideService } from '../../guides/guide.service';
import { WorkoutFactoryService } from './workout-factory.service';

import { RunningWorkoutComponent } from './running-workout.component';
import { StrengthTrainingWorkoutComponent } from './strength-training-workout.component';
import { StrengthTrainingWorkoutExercisesComponent } from './strength-training-workout-exercises.component';
import { CompletedToggleComponent } from './completed-toggle.component';
import { StrengthTrainingSetComponent } from './strength-training-set.component';
import { StrengthTrainingWorkoutExerciseComponent } from './strength-training-workout-exercise.component';
import { IncrementDecrementButtonComponent } from './increment-decrement-button.component';
import { AdjustWeightPickerComponent } from './adjust-weight-picker.component';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkoutTrackerRoutingModule
  ],
  declarations: [
    routedComponents,
    RunningWorkoutComponent,
    StrengthTrainingWorkoutComponent,
    StrengthTrainingWorkoutExercisesComponent,
    CompletedToggleComponent,
    StrengthTrainingSetComponent,
    StrengthTrainingWorkoutExerciseComponent,
    IncrementDecrementButtonComponent,
    AdjustWeightPickerComponent
  ],
  providers: [
    GuideService,
    WorkoutFactoryService
  ],
  exports: [
    
  ]
})
export class WorkoutTrackerModule {}