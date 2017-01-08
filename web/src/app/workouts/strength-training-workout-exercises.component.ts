import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { IWorkoutExercise, WorkoutExercise } from './workout';
@Component({
    selector: 'strength-training-workout-exercises',
    templateUrl: 'strength-training-workout-exercises.component.html'
})
export class StrengthTrainingWorkoutExercisesComponent implements OnInit {
    @Input('form')
    public form: FormGroup;

    @Input('exercises')
    public exercises: string;


    constructor() { }

    ngOnInit() { }
}