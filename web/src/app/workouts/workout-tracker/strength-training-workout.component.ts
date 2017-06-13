import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkout, Workout, IStrengthTrainingWorkout, StrengthTrainingWorkout, IWorkoutExercise, WorkoutExercise, ISet, Set, IRepetitionSet, RepetitionSet, IWeightsSet, WeightsSet } from '../workout-updated';

import { IGuide, IGuideExercise } from '../../guides/guide';

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
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() { 
        this.addControlsToForm();
    }

    private addControlsToForm(){
        this.form.addControl("guide", new FormControl(this.workout.guide));
        this.form.addControl("exercises", new FormArray([]));
    }
}