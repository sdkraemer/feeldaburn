import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'angular-calendar';

import { HomeRoutingModule, routedComponents } from './home.routing';

import { AuthService } from '../auth/auth.service';
import { WorkoutService } from '../workouts/workout.service';
import { CalendarService } from './calendar.service';

import { AuthenticatedHomeComponent }   from './authenticated-home.component';
import { NonAuthenticatedHomeComponent }   from './non-authenticated-home.component';

@NgModule({
    imports: [
        SharedModule,
        HomeRoutingModule,
        CalendarModule.forRoot()
    ],
    exports: [],
    declarations: [
        AuthenticatedHomeComponent,
        NonAuthenticatedHomeComponent,
        routedComponents],
    providers: [
        AuthService,
        WorkoutService,
        CalendarService
    ],
})
export class HomeModule { }
