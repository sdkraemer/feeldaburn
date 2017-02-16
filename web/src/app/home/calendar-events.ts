import { CalendarEvent } from 'angular-calendar';
import { IWorkout } from '../workouts/workout-updated';

export interface WorkoutEvent extends CalendarEvent {
    workout: IWorkout;
}