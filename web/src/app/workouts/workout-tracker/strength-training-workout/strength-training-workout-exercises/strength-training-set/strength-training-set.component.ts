import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

//rxjs
import { Observable } from "rxjs/Observable";

import {
  IStrengthTrainingWorkout,
  IWorkoutExercise,
  IRepetitionSet,
  IWeightsSet,
  ISet,
  IPreviousWorkoutExercise,
  IPreviousSet
} from "app/core";

import * as _ from "lodash";

@Component({
  selector: "strength-training-set",
  templateUrl: "strength-training-set.component.html",
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
export class StrengthTrainingSetComponent implements OnInit {
  @Input("set") public set: ISet;

  @Input("group") public group: FormGroup;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @Input("previousExercises")
  public previousExercises: IPreviousWorkoutExercise[];

  public previousSets: IPreviousSet[] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.previousSets = this.buildPreviousSets();
  }

  private buildPreviousSets() {
    let sets: IPreviousSet[] = [];
    this.previousExercises.forEach(previousExercise => {
      let set = this.findPreviousSetFromExercise(previousExercise);
      set.completedAt = previousExercise.completedAt;
      sets.push(set);
    }, this);
    return sets;
  }

  private findPreviousSetFromExercise(previousExercise) {
    let isSidedSet = this.set.side == "RIGHT" || this.set.side == "LEFT";
    if (isSidedSet) {
      return _.find(previousExercise.sets, { side: this.set.side });
    } else {
      return previousExercise.sets[0];
    }
  }

  copyRepititions(pastRepititions) {
    this.group.controls["repetitions"].setValue(pastRepititions);
  }

  copyWeight(pastWeight) {
    this.group.controls["weight"].setValue(pastWeight);
  }

  showPreviousWorkouts() {
    return !this.workout.isCompleted && this.previousSets.length > 0;
  }

  adjustWeightClicked(value, control) {
    control.patchValue(value);
  }
}
