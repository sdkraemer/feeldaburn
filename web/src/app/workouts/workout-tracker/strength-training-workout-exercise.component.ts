import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { IWorkout, IWorkoutExercise, IStrengthTrainingWorkout } from '../workout-updated';

@Component({
    selector: 'strength-training-workout-exercise',
    templateUrl: 'strength-training-workout-exercise.component.html'
})
export class StrengthTrainingWorkoutExerciseComponent implements OnInit {
    @Input("group")
    private group: FormGroup;

    @Input("exercise")
    private exercise: IWorkoutExercise;

    @Input("exercisesIndex")
    private exercisesIndex;

    @Input("workout")
    private workout: IWorkout;

    @Input("previousWorkouts")
    private previousWorkouts: Observable<IStrengthTrainingWorkout[]>;

    constructor() { }

    ngOnInit() { }
}