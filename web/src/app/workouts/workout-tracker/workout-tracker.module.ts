import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  WorkoutTrackerRoutingModule,
  routedComponents
} from "./workout-tracker.routing";

import { SharedModule } from "../../shared/shared.module";
import { GuideService } from "../../guides/guide.service";
import { StrengthTrainingFormFactoryService } from "./strength-training-workout/strength-training-form-factory.service";
import { WorkoutFactoryService } from "./workoutfactory.service";

import { RunningWorkoutComponent } from "./running-workout/running-workout.component";
import { StrengthTrainingWorkoutComponent } from "./strength-training-workout/strength-training-workout.component";
import { StrengthTrainingWorkoutExercisesComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-workout-exercises.component";
import { StrengthTrainingSetComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-set/strength-training-set.component";
import { StrengthTrainingWorkoutExerciseComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-workout-exercise.component";
import { IncrementDecrementButtonComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-set/increment-decrement-button.component";
import { DynamicWorkoutContainerComponent } from "./dynamic-workout-container.component";
import { StrengthTrainingSetInputControlComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-set/strength-training-set-input-control.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    WorkoutTrackerRoutingModule
  ],
  declarations: [
    routedComponents,
    RunningWorkoutComponent,
    StrengthTrainingWorkoutComponent,
    StrengthTrainingWorkoutExercisesComponent,
    StrengthTrainingSetComponent,
    StrengthTrainingWorkoutExerciseComponent,
    IncrementDecrementButtonComponent,
    DynamicWorkoutContainerComponent,
    StrengthTrainingSetInputControlComponent
  ],
  providers: [
    GuideService,
    StrengthTrainingFormFactoryService,
    WorkoutFactoryService
  ],
  exports: [],
  entryComponents: [StrengthTrainingWorkoutComponent, RunningWorkoutComponent]
})
export class WorkoutTrackerModule {}
