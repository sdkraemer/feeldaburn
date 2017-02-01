import { Component, OnInit } from '@angular/core';
import { Workout, IWorkout } from './workout';
import { WorkoutService } from './workout.service';

@Component({
    selector: 'workout-list',
    templateUrl: 'workout-list.component.html',
    styles: [`
        .card {
            margin-bottom: 1em;
            width: 18rem;
        }
    `]
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