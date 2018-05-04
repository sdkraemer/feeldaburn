import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Observable } from "rxjs/Observable";
import {
  IWorkoutExercise,
  IWorkout,
  ISet,
  IStrengthTrainingWorkout,
  StrengthTrainingWorkout,
  PreviousWorkoutExercise
} from "app/core";

import * as _ from "lodash";

@Component({
  selector: "strength-training-workout-exercise",
  templateUrl: "strength-training-workout-exercise.component.html"
})
export class StrengthTrainingWorkoutExerciseComponent implements OnInit {
  @Input("group") public group: FormGroup;

  @Input("exercise") public exercise: IWorkoutExercise;

  @Input("showExercise") public showExercise: boolean;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  public previousExercises: IWorkoutExercise[];

  constructor() {}

  ngOnInit() {
    this.previousExercises = this.retrievePreviousExerciseSets();
  }

  retrievePreviousExerciseSets() {
    let previousExercises: PreviousWorkoutExercise[] = [];
    //Pass only previous exercise data to set component. Maybe create a new model that has a date per exercise.
    if (this.workout.previousWorkouts) {
      let previousWorkouts: IStrengthTrainingWorkout[] = this.workout
        .previousWorkouts;
      previousWorkouts.forEach(function(previousWorkout) {
        let previousExercise: PreviousWorkoutExercise = _.find(
          previousWorkout.exercises,
          {
            guideExercise: this.exercise.guideExercise
          }
        );
        previousExercise.completedAt = previousWorkout.completedAt;
        previousExercises.push(previousExercise);
      }, this);
    }
    return previousExercises;
  }
}
