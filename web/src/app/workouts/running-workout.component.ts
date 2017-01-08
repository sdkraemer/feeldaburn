import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { RunningWorkoutType } from './workout';

@Component({
    selector: 'running-workout',
    templateUrl: 'running-workout.component.html'
})
export class RunningWorkoutComponent implements OnInit {
    @Input('form')
    public form: FormGroup;

    @Input('workoutType')
    public workoutType: RunningWorkoutType;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.removeExistingControl();
        if(!this.workoutType){
            this.workoutType = new RunningWorkoutType({
                _id: null,
                distance: null
            });
        }
        this.form.addControl('workoutType', this.formBuilder.group({
            _id: [this.workoutType._id],
            distance: [this.workoutType.distance]
        }));
    }

    private removeExistingControl(){
        if(this.form.get('workoutType')){
            this.form.removeControl('workoutType');
        }
    }

}