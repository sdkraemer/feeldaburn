import { Component, OnInit, Input } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

import { IRunningWorkout, TimeDuration } from "../../../core";

@Component({
  selector: "running-workout",
  templateUrl: "running-workout.component.html",
  styles: [
    `
      .push-left {
        float: left;
      }
    `
  ]
})
export class RunningWorkoutComponent implements OnInit {
  @Input("form")
  public form: FormGroup;

  @Input("workout")
  public workout: IRunningWorkout;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form.addControl("distance", new FormControl(this.workout.distance));
    this.form.addControl(
      "elapsed_time",
      new FormControl(
        this.createTimeDurationFromWorkoutElapsedTime(this.workout.elapsed_time)
      )
    );
    this.form.addControl("heartrate", new FormControl(this.workout.heartrate));
    this.form.addControl("calories", new FormControl(this.workout.calories));
  }

  createTimeDurationFromWorkoutElapsedTime(
    workoutElapsedTimeInSeconds: number
  ) {
    let minutes = Math.floor(workoutElapsedTimeInSeconds / 60);
    let seconds = workoutElapsedTimeInSeconds % 60;
    return new TimeDuration(minutes, seconds);
  }
}
