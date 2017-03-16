import { Component, OnInit } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { WorkoutService } from '../workouts/workout.service';
import { CalendarService } from './calendar.service';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';

import { CalendarEvent, CalendarDateFormatter } from 'angular-calendar';
import { CustomCalendarDateFormatter } from './custom-calendar-date-formatter.service';
import { WorkoutEvent } from './calendar-events';


@Component({
    selector: 'authenticated-home',
    templateUrl: 'authenticated-home.component.html',
    providers: [{
    provide: CalendarDateFormatter,
    useClass: CustomCalendarDateFormatter
  }]
})
export class AuthenticatedHomeComponent implements OnInit {
    view: string = 'month';
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
        const getStart: any = {
            month: startOfMonth,
            week: startOfWeek,
            day: startOfDay
        }[this.view];

        const getEnd: any = {
            month: endOfMonth,
            week: endOfWeek,
            day: endOfDay
        }[this.view];


        const search: URLSearchParams = new URLSearchParams();
        search.set('start', format(getStart(this.viewDate), 'YYYY-MM-DD'));
        search.set('end', format(getEnd(this.viewDate), 'YYYY-MM-DD'));
        this.events = this.calendarService.getWorkoutEvents(search);
    }

    public dateChanged(){
        this.getWorkouts();
    }
}