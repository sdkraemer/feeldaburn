import { NgModule } from '@angular/core';

import { WorkoutsRoutingModule, routedComponents } from './workouts.routing';

import { SharedModule } from '../shared/shared.module';
import { WorkoutService } from './workout.service';

import { WorkoutListComponent } from './workout-list.component';
import { WorkoutTypeComponent } from './workout-type.component';

@NgModule({
    imports: [
        SharedModule,
        WorkoutsRoutingModule
    ],
    exports: [],
    declarations: [
        WorkoutListComponent,
        WorkoutTypeComponent,
        routedComponents
    ],
    providers: [
        WorkoutService
    ],
})
export class WorkoutsModule { }
