import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Workout } from './workout';
import { WorkoutService } from './workout.service';

import { Guide } from '../guides/guide';
import { GuideService } from '../guides/guide.service';

//rxjs
import 'rxjs/add/operator/do'; 

@Component({
    selector: 'workout',
    templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit {
    public workout: Workout;
    public guides: Guide[];

    constructor(
        private workoutService: WorkoutService,
        private guideService: GuideService, 
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.getGuides();

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

    private getGuides(){
        this.guideService.getGuides()
            .subscribe((guides) => {
                this.guides = guides;
            });
    }

    onDelete(form){
        console.log("deleting workout");
        console.dir(form);
        this.workoutService.remove(form.value._id)
            .subscribe((isSuccessful: boolean) => {
                this.goToWorkouts();
            });
    }

    onComplete(form){
        console.log("onSubmit");
        form.value.completedAt = new Date();
        this.onSubmit(form);
    }

    onSubmit(form){
        console.log("onSubmit");
        this.workout.name = form.value.name;
        this.workout.guide = form.value.guide;
        this.workout.createdAt = form.value.createdAt;
        this.workout.notes = form.value.notes;
        this.workout.completedAt = form.value.completedAt;
        console.log(form.value.guide);
        console.dir(form.value);
        console.dir(this.workout);

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