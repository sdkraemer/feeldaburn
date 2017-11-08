import { Component, OnInit } from '@angular/core';
import {trigger, transition, style, animate} from "@angular/animations";
import { Workout, IWorkout } from '../core/models/workout';
import { WorkoutService } from './workout.service';

@Component({
    selector: 'workout-list',
    templateUrl: 'workout-list.component.html',
    styles: [`
        .card {
            margin-bottom: 1em;
            width: 18rem;
        }
    `],
    animations: [
        trigger('workoutEnter', [
            transition(":enter", [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ])
        ])
    ]
})
export class WorkoutListComponent implements OnInit {
    workouts: Workout[];
    constructor(
        private workoutService: WorkoutService) { }

    ngOnInit() {
        this.getWorkouts();
    }

    getWorkouts(){
        this.workoutService.getWorkouts()
            .subscribe((workouts: IWorkout[]) => {
                this.workouts = workouts;
            }); 
    }
}