import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { WorkoutService } from '../workouts/workout.service';
import { CalendarService } from './calendar.service';

import { WorkoutEvent } from './calendar-events';


@Component({
    selector: 'authenticated-home',
    templateUrl: 'authenticated-home.component.html'
})
export class AuthenticatedHomeComponent implements OnInit {
    viewDate: Date = new Date();
    events: Observable<WorkoutEvent[]>;

    constructor(
        private workoutService: WorkoutService,
        private calendarService: CalendarService
    ) { }

    ngOnInit() { 
        this.getWorkouts();
    }

    private getWorkouts(){
        this.events = this.calendarService.getWorkoutEvents();
    }
}