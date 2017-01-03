import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
    selector: 'running-workout',
    templateUrl: 'running-workout.component.html'
})
export class RunningWorkoutComponent implements OnInit {
    @Input('form')
    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.removeExistingControl();
        this.form.addControl('workoutType', this.formBuilder.group({
            distance: ['']
        }));
    }

    private removeExistingControl(){
        if(this.form.get('workoutType')){
            this.form.removeControl('workoutType');
        }
    }

}