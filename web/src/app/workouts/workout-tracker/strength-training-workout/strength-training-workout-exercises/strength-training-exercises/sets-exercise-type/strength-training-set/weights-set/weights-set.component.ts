import { Component, OnInit, Input } from "@angular/core";
import {
  ISet,
  IWorkoutExercise,
  IStrengthTrainingWorkout,
  IPreviousSet
} from "app/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-weights-set",
  templateUrl: "./weights-set.component.html",
  styleUrls: ["./weights-set.component.scss"],
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
export class WeightsSetComponent implements OnInit {
  @Input("set") public set: ISet;

  @Input("formGroup") public formGroup: FormGroup;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @Input("exercise") public exercise: IWorkoutExercise;

  @Input("previousSets") public previousSets: IPreviousSet[] = [];

  constructor() {}

  ngOnInit() {}

  copyWeight(pastWeight) {
    this.formGroup.controls["weight"].setValue(pastWeight);
  }

  showPreviousWorkouts() {
    return !this.workout.isCompleted && this.previousSets.length > 0;
  }

  adjustWeightChange(event) {
    this.formGroup.controls.adjustWeight.patchValue(event);
  }
}
