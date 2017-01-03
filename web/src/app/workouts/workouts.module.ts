import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { WorkoutsRoutingModule, routedComponents } from './workouts.routing';

import { SharedModule } from '../shared/shared.module';
import { WorkoutService } from './workout.service';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutTypeComponent } from './workout-type.component';
import { StrengthTrainingWorkoutComponent } from './strength-training-workout.component';
import { RunningWorkoutComponent } from './running-workout.component';

import { GuideService } from '../guides/guide.service';

@NgModule({
    imports: [
        SharedModule,
        WorkoutsRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [
        WorkoutListComponent,
        WorkoutTypeComponent,
        routedComponents,
        StrengthTrainingWorkoutComponent,
        RunningWorkoutComponent
    ],
    providers: [
        WorkoutService,
        GuideService
    ],
})
export class WorkoutsModule { }
