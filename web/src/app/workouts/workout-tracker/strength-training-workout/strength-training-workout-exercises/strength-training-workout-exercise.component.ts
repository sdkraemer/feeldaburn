import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Observable } from "rxjs/Observable";
import { IWorkoutExercise, IWorkout } from "app/core";

@Component({
  selector: "strength-training-workout-exercise",
  templateUrl: "strength-training-workout-exercise.component.html"
})
export class StrengthTrainingWorkoutExerciseComponent implements OnInit {
  @Input("group") public group: FormGroup;

  @Input("exercise") public exercise: IWorkoutExercise;

  @Input("showExercise") public showExercise: boolean;

  @Input("workout") public workout: IWorkout;

  constructor() {}

  ngOnInit() {}
}
