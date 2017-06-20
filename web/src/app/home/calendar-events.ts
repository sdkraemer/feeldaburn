import { CalendarEvent } from 'angular-calendar';
import { IWorkout } from '../core';

export interface WorkoutEvent extends CalendarEvent {
    workout: IWorkout;
}