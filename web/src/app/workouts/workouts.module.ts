import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkoutsRoutingModule, routedComponents } from './workouts.routing';

import { WorkoutPickerModule } from './workout-picker/workout-picker.module';
import { WorkoutTrackerModule } from './workout-tracker/workout-tracker.module';
import { SharedModule } from '../shared/shared.module';
import { WorkoutService } from './workout.service';

import { WorkoutListComponent } from './workout-list.component';
import { StrengthTrainingWorkoutComponent } from './strength-training-workout.component';
import { StrengthTrainingWorkoutExercisesComponent } from './strength-training-workout-exercises.component';
import { RunningWorkoutComponent } from './running-workout.component';

import { GuideService } from '../guides/guide.service';

@NgModule({
    imports: [
        SharedModule,
        WorkoutsRoutingModule,
        ReactiveFormsModule,
        WorkoutPickerModule,
        WorkoutTrackerModule
    ],
    exports: [],
    declarations: [
        WorkoutListComponent,
        routedComponents,
        StrengthTrainingWorkoutComponent,
        RunningWorkoutComponent,
        StrengthTrainingWorkoutExercisesComponent
    ],
    providers: [
        WorkoutService,
        GuideService
    ],
})
export class WorkoutsModule { }
