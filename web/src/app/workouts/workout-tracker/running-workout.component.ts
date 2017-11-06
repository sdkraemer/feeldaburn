import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IRunningWorkout } from '../../core';

@Component({
    selector: 'running-workout',
    templateUrl: 'running-workout.component.html'
})
export class RunningWorkoutComponent implements OnInit {
    @Input("form")
    public form: FormGroup;

    @Input("workout")
    public workout: IRunningWorkout;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() { 
        this.form.addControl("distance", new FormControl(this.workout.distance));
        this.form.addControl("elapsed_time", new FormControl(this.workout.elapsed_time));
        this.form.addControl("pace", new FormControl(this.workout.pace));
        this.form.addControl("heartrate", new FormControl(this.workout.heartrate));
        this.form.addControl("calories", new FormControl(this.workout.calories));
    }

}