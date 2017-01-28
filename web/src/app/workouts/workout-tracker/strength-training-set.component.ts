import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

//rxjs
import { Observable } from 'rxjs/Observable';

import { IStrengthTrainingWorkout, IWorkoutExercise, IRepetitionSet, IWeightsSet, ISet } from '../workout-updated';

import * as _ from 'lodash';

@Component({
    selector: 'strength-training-set',
    templateUrl: 'strength-training-set.component.html'
})
export class StrengthTrainingSetComponent implements OnInit {
    @Input("set")
    public set: ISet;

    @Input("group")
    public group: FormGroup;

    @Input("exercise")
    public exercise: IWorkoutExercise;

    @Input("previousWorkouts")
    public previousWorkoutsObservable: Observable<IStrengthTrainingWorkout[]>;

    @Input("workout")
    public workout: IStrengthTrainingWorkout;

    private previousWorkoutDates: Date[] = [];
    private previousSets: ISet[] = [];

    constructor() { }

    ngOnInit() {
        if(this.previousWorkoutsObservable){
            this.previousWorkoutsObservable
                .subscribe((workouts) => {
                    this.getPreviousExerciseSets(workouts);
                });
        }
    }

    getPreviousExerciseSets(workouts: IStrengthTrainingWorkout[]){
        workouts.forEach(function(workout){
            this.previousWorkoutDates.push(workout.completedAt);
            var exercise: IWorkoutExercise = _.find(workout.exercises, {guideExercise: this.exercise.guideExercise });
            
            if(this.set.sided){
                this.previousSets.push(_.find(exercise.sets, {side: this.set.side}));
            }
            else{
                this.previousSets.push(exercise.sets[0]);
            }
        }, this);
    }

    copyRepititions(pastRepititions) {
        this.group.controls['repetitions'].setValue(pastRepititions);
    }

    copyWeight(pastWeight) {
        this.group.controls['weight'].setValue(pastWeight);
    }
}