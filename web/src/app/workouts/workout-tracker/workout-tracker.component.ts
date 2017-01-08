import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { IWorkout, Workout } from '../workout';

import { WorkoutService } from '../workout.service';
import { GuideService } from '../../guides/guide.service';

@Component({
    selector: 'workout-tracker',
    templateUrl: 'workout-tracker.component.html'
})
export class WorkoutTrackerComponent implements OnInit {
    private workout: IWorkout;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workoutService: WorkoutService,
        private guideService: GuideService
    ) { }

    ngOnInit() { 
        //this.route.params.value.guide
    //     this.route.params
    //         .map((params: Params) => {
    //             let id = params['id'];
    //             if(id){
    //                 this.getWorkout(id);
    //             }
    //             else{
    //                 let workoutType = params['workoutType'];
    //                 let guide = params['guide'];
    //                 console.log(`Starting to track new workout: ${workoutType}, ${guide}`);
    //             }
    //   });
        let id = this.route.snapshot.params['id'];
        if(id){
            this.getWorkout(id);
        }
        else{
            let workoutType = this.route.snapshot.params['workoutType'];
            let guide = this.route.snapshot.params['guide'];
            console.log(`Starting to track new workout: ${workoutType}, ${guide}`);
        }
    }

    getWorkout(id){
        this.workoutService.getWorkout(id)
            .subscribe(workout => {
                this.workout = workout;
            });
    }

    createWorkout(options) {
        let workout: IWorkout;
        if(options.workoutType == 'RUNNING'){
            workout = new ...
        }
    }
}