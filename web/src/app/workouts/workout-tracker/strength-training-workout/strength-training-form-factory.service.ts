import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import {
  IWorkoutExercise,
  ISet,
  IRepsWeightsSet,
  IWeightsSet,
  IRepetitionSet
} from "app/core";

@Injectable()
export class StrengthTrainingFormFactoryService {
  constructor(private formBuilder: FormBuilder) {}

  public createExerciseFormGroup(exercise: IWorkoutExercise) {
    let exerciseGroup = this.formBuilder.group({
      name: exercise.name,
      guideExercise: exercise.guideExercise,
      type: exercise.type
    });

    if (exercise.type == "COMPLETED") {
      exerciseGroup.addControl(
        "isCompleted",
        this.formBuilder.control(exercise.isCompleted)
      );
    } else if (exercise.type == "SECONDS") {
      exerciseGroup.addControl(
        "seconds",
        this.formBuilder.control(exercise.seconds)
      );
    }

    let setsFormArray = this.createSetsFormArray(exercise);
    if (setsFormArray) {
      exerciseGroup.addControl("sets", setsFormArray);
    }
    return exerciseGroup;
  }

  private createSetsFormArray(exercise: IWorkoutExercise): FormArray {
    let setsFormArray: FormArray;
    let doesExerciseHaveSets = exercise.sets && exercise.sets.length > 0;
    if (doesExerciseHaveSets) {
      setsFormArray = this.formBuilder.array([]);
      exercise.sets.forEach(set => {
        setsFormArray.push(this.createSetFormGroup(exercise.type, set));
      }, this);
    }
    return setsFormArray;
  }

  private createSetFormGroup(exerciseType, set: ISet): FormGroup {
    let setFormGroup;

    if (exerciseType == "REPS_WEIGHTS") {
      setFormGroup = this.createRepsWeightsSetFormGroup(<IRepsWeightsSet>set);
    } else if (exerciseType == "REPS") {
      setFormGroup = this.createRepetitionFormGroup(set);
    } else if (exerciseType == "WEIGHTS") {
      setFormGroup = this.createWeightsSetFormGroup(<IWeightsSet>set);
    } else {
      console.error("Unknown sets type");
    }

    return setFormGroup;
  }

  private createRepetitionFormGroup(set: IRepetitionSet) {
    return this.formBuilder.group({
      side: [set.side],
      repetitions: [set.repetitions]
    });
  }

  private createRepsWeightsSetFormGroup(set: IRepsWeightsSet) {
    return this.formBuilder.group({
      side: [set.side],
      repetitions: [set.repetitions],
      weight: [set.weight],
      adjustWeight: [set.adjustWeight]
    });
  }

  private createWeightsSetFormGroup(set: IWeightsSet) {
    return this.formBuilder.group({
      side: [set.side],
      weight: [set.weight],
      adjustWeight: [set.adjustWeight]
    });
  }
}
