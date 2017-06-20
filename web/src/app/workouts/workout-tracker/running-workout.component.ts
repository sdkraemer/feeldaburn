import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkout, Workout, IRunningWorkout, RunningWorkout } from '../../core/';

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
        this.form.addControl("distance", new FormControl());
        this.form.addControl("elapsed_time", new FormControl());
        this.form.addControl("pace", new FormControl());
        this.form.addControl("heartrate", new FormControl());
        this.form.addControl("calories", new FormControl());
    }

}