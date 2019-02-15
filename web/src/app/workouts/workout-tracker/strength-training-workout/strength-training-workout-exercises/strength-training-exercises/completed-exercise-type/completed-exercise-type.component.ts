import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IStrengthTrainingWorkout, IWorkoutExercise } from "app/core";

@Component({
  selector: "app-completed-exercise-type",
  templateUrl: "./completed-exercise-type.component.html",
  styleUrls: ["./completed-exercise-type.component.scss"]
})
export class CompletedExerciseTypeComponent implements OnInit {
  @Input("form") public form: FormGroup;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @Input("exercise") public exercise: IWorkoutExercise;

  constructor() {}

  ngOnInit() {}
}
