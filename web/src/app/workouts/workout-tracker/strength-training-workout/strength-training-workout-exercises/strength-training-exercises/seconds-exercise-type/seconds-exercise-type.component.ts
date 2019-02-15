import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IStrengthTrainingWorkout, IWorkoutExercise } from "app/core";

@Component({
  selector: "app-seconds-exercise-type",
  templateUrl: "./seconds-exercise-type.component.html",
  styleUrls: ["./seconds-exercise-type.component.scss"]
})
export class SecondsExerciseTypeComponent implements OnInit {
  @Input("form") public form: FormGroup;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @Input("exercise") public exercise: IWorkoutExercise;

  constructor() {}

  ngOnInit() {}
}
