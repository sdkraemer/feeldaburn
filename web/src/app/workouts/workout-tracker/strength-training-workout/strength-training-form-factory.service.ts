import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IWorkoutExercise, ISet, IWeightsSet } from "app/core";

@Injectable()
export class StrengthTrainingFormFactoryService {

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    public createExerciseFormGroup(exercise : IWorkoutExercise) {
        let exerciseGroup = this.formBuilder.group({
                name: exercise.name,
                guideExercise: exercise.guideExercise,
                type: exercise.type
            });

            if(exercise.type == 'COMPLETED'){
                exerciseGroup.addControl("isCompleted", this.formBuilder.control(exercise.isCompleted));
            }
            else if(exercise.type == 'SECONDS') {
                exerciseGroup.addControl("seconds", this.formBuilder.control(exercise.seconds));
            }

            this.createSetsControlOnExerciseGroup(exerciseGroup, exercise);
        return exerciseGroup;
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
            weight: [set.weight],
            adjustWeight: [set.adjustWeight]
        });
    }
}