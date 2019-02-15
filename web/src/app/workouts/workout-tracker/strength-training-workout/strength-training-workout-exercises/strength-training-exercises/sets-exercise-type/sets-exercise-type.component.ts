import { Component, OnInit, Input } from "@angular/core";
import {
  IPreviousWorkoutExercise,
  PreviousWorkoutExercise
} from "app/core/models/previousworkoutexercise";

import * as _ from "lodash";
import { IStrengthTrainingWorkout, IWorkoutExercise } from "app/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "sets-exercise-type",
  templateUrl: "./sets-exercise-type.component.html",
  styleUrls: ["./sets-exercise-type.component.scss"]
})
export class SetsExerciseTypeComponent implements OnInit {
  @Input("form") public form: FormGroup;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @Input("exercise") public exercise: IWorkoutExercise;

  public previousExercises: IPreviousWorkoutExercise[];

  constructor() {
    this.previousExercises = [];
  }

  ngOnInit() {
    this.previousExercises = this.retrievePreviousExerciseSets();
  }

  ngOnChanges() {}

  private retrievePreviousExerciseSets() {
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
