import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { WorkoutService } from '../../workout.service';
import { StrengthTrainingFormFactoryService } from "./strength-training-form-factory.service";
import { IStrengthTrainingWorkout } from "app/core";

@Component({
    selector: 'strength-training-workout-exercises',
    templateUrl: 'strength-training-workout-exercises.component.html',
    styles: [`
        .card {
            margin-bottom: 1em;
        }
    `]
})
export class StrengthTrainingWorkoutExercisesComponent implements OnInit {
    @Input("form")
    public form: FormGroup;

    @Input("workout")
    public workout: IStrengthTrainingWorkout;

    public activeExerciseIndex: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private workoutService: WorkoutService,
        private strengthTrainingFormFactoryService: StrengthTrainingFormFactoryService
    ) { }

    ngOnInit() {
        if(this.workout) {
            this.setupForm();
        }
    }
    

    private setupForm() {
        this.form.addControl("exercises", new FormArray([]));
        this.addExerciseControlsFromWorkout();
    }

    addExerciseControlsFromWorkout(){
        const exerciseControl = <FormArray>this.form.controls['exercises'];
        this.workout.exercises.forEach((exercise) => {
            let exerciseGroup = this.strengthTrainingFormFactoryService.createExerciseFormGroup(exercise);
            exerciseControl.push(exerciseGroup);
        }, this);
    }

    public changeWorkout(modifier){
        this.activeExerciseIndex += modifier;
    }

    public goToNextExercise() {
        this.activeExerciseIndex++;
    }

    public goToPreviousExercise() {
        this.activeExerciseIndex--;
    }

    public isLastExercise() {
        return this.activeExerciseIndex == (this.workout.exercises.length-1);
    }

    public isFirstExercise() {
        return this.activeExerciseIndex == 0;
    }
}