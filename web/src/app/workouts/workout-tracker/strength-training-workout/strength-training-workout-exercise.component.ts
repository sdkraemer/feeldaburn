import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { IWorkout, IWorkoutExercise, IStrengthTrainingWorkout } from '../../../core';

@Component({
    selector: 'strength-training-workout-exercise',
    templateUrl: 'strength-training-workout-exercise.component.html'
})
export class StrengthTrainingWorkoutExerciseComponent implements OnInit {
    @Input("group")
    public group: FormGroup;

    @Input("exercise")
    public exercise: IWorkoutExercise;

    @Input("exercisesIndex")
    public exercisesIndex: number;

    @Input("workout")
    public workout: IWorkout;

    @Input("activeExerciseIndex")
    public activeExerciseIndex: number;

    constructor() { }

    ngOnInit() { }

}