import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

//rxjs
import { Observable } from 'rxjs/Observable';

import { IStrengthTrainingWorkout, IWorkoutExercise, IRepetitionSet, IWeightsSet, ISet } from '../../core';

import * as _ from 'lodash';

@Component({
    selector: 'strength-training-set',
    templateUrl: 'strength-training-set.component.html',
    styles: [`
        .previous-set-adjust-weight > .fa-arrow-down {
            color: #a83232;
        }

        .previous-set-adjust-weight > .fa-arrow-up {
            color: #1d831d;
        }
    `]
})
export class StrengthTrainingSetComponent implements OnInit {
    @Input("set")
    public set: ISet;

    @Input("group")
    public group: FormGroup;

    @Input("exercise")
    public exercise: IWorkoutExercise;

    @Input("previousWorkouts")
    public previousWorkouts: IStrengthTrainingWorkout[];

    @Input("workout")
    public workout: IStrengthTrainingWorkout;

    private previousWorkoutDates: Date[] = [];
    private previousSets: ISet[] = [];

    constructor() { }

    ngOnInit() {
        
    }

    ngOnChanges() {
        this.getPreviousExerciseSets(this.previousWorkouts);
    }

    private getPreviousExerciseSets(previousWorkouts: IStrengthTrainingWorkout[]){
        if(previousWorkouts){
            previousWorkouts.forEach(function(previousWorkout){
                this.previousWorkoutDates.push(previousWorkout.completedAt);
                let previousExercise = this.getPreviousExercise(previousWorkout);
                this.previousSets.push(this.getPreviousSetFromExercise(previousExercise));
            }, this);
        }
    }

    private getPreviousExercise(previousWorkout: IStrengthTrainingWorkout): IWorkoutExercise {
        return _.find(previousWorkout.exercises, {guideExercise: this.exercise.guideExercise });
    }

    private getPreviousSetFromExercise(previousExercise) {
        let isSidedSet = this.set.side == "RIGHT" || this.set.side == "LEFT"
        if(isSidedSet) {
            return _.find(previousExercise.sets, {side: this.set.side});
        }
        else {
            return previousExercise.sets[0];
        }
    }

    copyRepititions(pastRepititions) {
        this.group.controls['repetitions'].setValue(pastRepititions);
    }

    copyWeight(pastWeight) {
        this.group.controls['weight'].setValue(pastWeight);
    }
}