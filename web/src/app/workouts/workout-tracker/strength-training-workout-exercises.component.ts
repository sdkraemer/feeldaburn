import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { IStrengthTrainingWorkout, IWorkoutExercise, IRepetitionSet, IWeightsSet, ISet } from '../workout-updated';
import { WorkoutService } from '../workout.service';

@Component({
    selector: 'strength-training-workout-exercises',
    templateUrl: 'strength-training-workout-exercises.component.html'
})
export class StrengthTrainingWorkoutExercisesComponent implements OnInit {
    @Input("form")
    public form: FormGroup;

    @Input("workout")
    public workout: IStrengthTrainingWorkout;

    private previousWorkouts: Observable<IStrengthTrainingWorkout[]>;

    constructor(
        private formBuilder: FormBuilder,
        private workoutService: WorkoutService
    ) { }

    ngOnInit() { 
        if(!this.workout._id){
            this.previousWorkouts = this.getPreviousWorkouts(this.workout.guide);
        }
        this.form.addControl("exercises", new FormArray([]));
        this.addExerciseControlsFromWorkout();
    }

    addExerciseControlsFromWorkout(){
        const exerciseControl = <FormArray>this.form.controls['exercises'];
        this.workout.exercises.forEach((exercise) => {
            let exerciseGroup = this.formBuilder.group({
                name: exercise.name,
                guideExercise: exercise.guideExercise,
                type: exercise.type
            });

            this.createSetsControlOnExerciseGroup(exerciseGroup, exercise);
            
            exerciseControl.push(exerciseGroup);
        }, this);
    }

    private createSetsControlOnExerciseGroup(exerciseGroup, exercise: IWorkoutExercise){
        if(exercise.sets && exercise.sets.length > 0) {
            let setsControl = this.formBuilder.array([]);
            exercise.sets.forEach((set, index) => {
                setsControl.push(this.createSetFormGroup(exercise.type, set));
            }, this);
            exerciseGroup.addControl("sets", setsControl);
        }
    }

    private createSetFormGroup(exerciseType, set: ISet): FormGroup {
        if(exerciseType == 'WEIGHTS'){
            return this.createWeightsSetFormGroup(<IWeightsSet>set);
        }
        
        return this.formBuilder.group({
            side: [set.side],
            repetitions: [set.repetitions]
        });
    }

    private createWeightsSetFormGroup(set: IWeightsSet){
        return this.formBuilder.group({
            side: [set.side],
            repetitions: [set.repetitions],
            weight: [set.weight]
        });
    }

    private getPreviousWorkouts(guideId: string): Observable<IStrengthTrainingWorkout[]>{
        return this.workoutService
                    .getPreviousStrengthTrainingWorkouts(guideId);
    }
}