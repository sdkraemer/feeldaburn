import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IGuide, IGuideExercise } from '../../../core';
import { Observable } from "rxjs/Observable";
import { IStrengthTrainingWorkout } from "app/core";
import { WorkoutService } from "app/workouts/workout.service";

import * as _ from 'lodash';

@Component({
    selector: 'strength-training-workout',
    templateUrl: 'strength-training-workout.component.html'
})
export class StrengthTrainingWorkoutComponent implements OnInit {
    @Input("form")
    public form: FormGroup;

    @Input("workout")
    public workout: IStrengthTrainingWorkout;

    private guide: IGuide;

    constructor(
        private formBuilder: FormBuilder,
        private workoutService: WorkoutService,
    ) { }

    ngOnInit() { 
    }
    
    ngOnChanges() {
        this.addControlsToForm();
        this.retrievePreviousWorkouts(this.workout.guide);
    }

    private addControlsToForm(){
        this.form.addControl("guide", new FormControl(this.workout.guide));
        this.form.addControl("exercises", new FormArray([]));
    }

    private retrievePreviousWorkouts(guideId: string){
        let isNewWorkout = !this.workout._id;
        if(isNewWorkout) {
            this.workoutService
            .getPreviousStrengthTrainingWorkouts(guideId)
                .subscribe((previousWorkouts) => {
                    //Need to change workout object reference to trigger ngOnChanges in child components.
                    let updatedWorkout = _.cloneDeep(this.workout);
                    updatedWorkout.previousWorkouts = previousWorkouts;
                    this.workout = updatedWorkout;
                });
        }
    }
}