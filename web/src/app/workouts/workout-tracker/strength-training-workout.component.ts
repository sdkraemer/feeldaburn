import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkout, Workout, IStrengthTrainingWorkout, StrengthTrainingWorkout, IWorkoutExercise, WorkoutExercise, ISet, Set, IRepetitionSet, RepetitionSet, IWeightsSet, WeightsSet } from '../workout-updated';


import { GuideService } from '../../guides/guide.service';
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
        private formBuilder: FormBuilder,
        private guideService: GuideService
    ) { }

    ngOnInit() { 
        this.addControlsToForm();
        this.getGuide(this.workout.guide, () => {
            this.workout.exercises = this.createExercisesFromGuide(this.guide);
        });
    }

    getGuide(_id, callback) {
        this.guideService
            .getGuide(_id)
            .subscribe((guide) => {
                this.guide = guide;
            },
            error => console.log('Could not load guide: '+_id),
            callback);
    }

    private addControlsToForm(){
        this.form.addControl("guide", new FormControl(this.workout.guide));
        this.form.addControl("exercises", new FormArray([]));
    }

    private createExercisesFromGuide(guide: IGuide): IWorkoutExercise[]{
        let workoutExercises: IWorkoutExercise[] = [];
        guide.exercises.forEach(function(exercise: IGuideExercise){
            let workoutExercise = new WorkoutExercise({
                name: exercise.name,
                guideExercise: exercise._id,
                sets: [],
                type: exercise.type
            });

            //'REPS', 'WEIGHTS'
            if(exercise.type == 'REPS' || exercise.type == 'WEIGHTS'){
                if(exercise.sided){
                    workoutExercise.sets.push(this.createSet(exercise.type, 'RIGHT'));
                    workoutExercise.sets.push(this.createSet(exercise.type, 'LEFT'));
                }
                else{
                    workoutExercise.sets.push(this.createSet(exercise.type));
                }
            }

            workoutExercises.push(workoutExercise);
        }, this);

        return workoutExercises;
    }

    private createSet(type: string, side: string = 'NONE'){
        let set: ISet = null;
        if(type == 'REPS') {
            set = new RepetitionSet({
                repetitions: 0,
                side: side
            });
        }
        else if (type = 'WEIGHTS') {
            set = new WeightsSet({
                repetitions: 0,
                weight: 0,
                side: side
            });
        }

        return set;
    }
}