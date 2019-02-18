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
import { StrengthTrainingWorkoutExerciseComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-workout-exercise.component";
import { DynamicWorkoutContainerComponent } from "./dynamic-workout-container.component";
import { CompletedExerciseTypeComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/completed-exercise-type/completed-exercise-type.component";
import { SecondsExerciseTypeComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/seconds-exercise-type/seconds-exercise-type.component";
import { SetsExerciseTypeComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/sets-exercise-type.component";
import { StrengthTrainingSetComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/strength-training-set/strength-training-set.component";
import { StrengthTrainingSetInputControlComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/strength-training-set/strength-training-set-input-control.component";
import { RepsSetComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/strength-training-set/reps-set/reps-set.component";
import { RepsWeightsSetComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/strength-training-set/reps-weights-set/reps-weights-set.component";
import { WeightsSetComponent } from "./strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/strength-training-set/weights-set/weights-set.component";
import { AdjustWeightMenuComponent } from './strength-training-workout/strength-training-workout-exercises/strength-training-exercises/sets-exercise-type/strength-training-set/adjust-weight-menu/adjust-weight-menu.component';

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
    DynamicWorkoutContainerComponent,
    StrengthTrainingSetInputControlComponent,
    SetsExerciseTypeComponent,
    CompletedExerciseTypeComponent,
    SecondsExerciseTypeComponent,
    RepsSetComponent,
    RepsWeightsSetComponent,
    WeightsSetComponent,
    AdjustWeightMenuComponent
  ],
  providers: [
    GuideService,
    StrengthTrainingFormFactoryService,
    WorkoutFactoryService
  ],
  exports: [],
  entryComponents: [
    StrengthTrainingWorkoutComponent,
    RunningWorkoutComponent,
    SetsExerciseTypeComponent,
    CompletedExerciseTypeComponent,
    SecondsExerciseTypeComponent,
    WeightsSetComponent,
    RepsWeightsSetComponent,
    RepsSetComponent
  ]
})
export class WorkoutTrackerModule {}
