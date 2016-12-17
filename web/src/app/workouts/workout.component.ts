import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Workout } from './workout';
import { WorkoutService } from './workout.service';

//rxjs
import 'rxjs/add/operator/do'; 

@Component({
    selector: 'workout',
    templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit {
    public workout: Workout;

    constructor(
        private workoutService: WorkoutService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() { 
        this.route
            .params
            .map(params => params['id'])
            //.do(id => this._id = id)
            .subscribe(id => this.getWorkout(id));
    }

    private getWorkout(_id) {
        if(_id == 'New'){
            this.workout = new Workout();
        }
        else{
            this.workoutService.getWorkout(_id)
                .subscribe((workout) => this.workout = workout);
        }
    }

    onSubmit(form){
        this.workout.name = form.value.name;
        if(form.value._id){
            console.log("Saving an existing workout");
            this.workoutService.update(this.workout)
                .subscribe((isSuccessful: boolean) => {
                    this.goToWorkouts();
                });
        }
        else{
            console.log("Saving a new workout");
            this.workoutService.add(this.workout)
                .subscribe((isSuccessful: boolean) => {
                    this.goToWorkouts();
                });
        }
        this.goToWorkouts();
    }

    goToWorkouts() {
        this.router.navigate(['/workouts']);
    }
}