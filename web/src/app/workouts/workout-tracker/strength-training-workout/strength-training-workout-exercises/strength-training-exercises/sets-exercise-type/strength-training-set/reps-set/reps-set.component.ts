import { Component, OnInit, Input } from "@angular/core";
import {
  ISet,
  IStrengthTrainingWorkout,
  IWorkoutExercise,
  IPreviousSet
} from "app/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-reps-set",
  templateUrl: "./reps-set.component.html",
  styleUrls: ["./reps-set.component.scss"],
  styles: [
    `
      ::ng-deep .mat-form-field .mat-form-field-infix {
        width: auto;
      }

      ::ng-deep .mat-form-field .mat-form-field-prefix button {
        min-width: 0px !important;
      }

      ::ng-deep .mat-form-field .mat-form-field-suffix button {
        min-width: 0px !important;
      }

      .previous-set-adjust-weight > .fa-arrow-down {
        color: #a83232;
      }

      .previous-set-adjust-weight > .fa-arrow-up {
        color: #1d831d;
      }
    `
  ]
})
export class RepsSetComponent implements OnInit {
  @Input("set") public set: ISet;

  @Input("formGroup") public formGroup: FormGroup;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @Input("exercise") public exercise: IWorkoutExercise;

  @Input("previousSets") public previousSets: IPreviousSet[] = [];

  constructor() {}

  ngOnInit() {}

  copyRepititions(pastRepititions) {
    this.formGroup.controls["repetitions"].setValue(pastRepititions);
  }

  adjustWeightClicked(value, control) {
    control.patchValue(value);
  }

  showPreviousWorkouts() {
    return !this.workout.isCompleted && this.previousSets.length > 0;
  }
}
