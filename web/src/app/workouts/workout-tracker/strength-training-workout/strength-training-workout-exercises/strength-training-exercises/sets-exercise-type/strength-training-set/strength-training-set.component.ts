import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver
} from "@angular/core";
import { FormGroup } from "@angular/forms";

//rxjs
import { Observable } from "rxjs/Observable";

import {
  IStrengthTrainingWorkout,
  IWorkoutExercise,
  ISet,
  IPreviousWorkoutExercise,
  IPreviousSet
} from "app/core";

import * as _ from "lodash";
import { RepsSetComponent } from "./reps-set/reps-set.component";
import { WeightsSetComponent } from "./weights-set/weights-set.component";
import { RepsWeightsSetComponent } from "./reps-weights-set/reps-weights-set.component";

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

  @Input("exercise") public exercise: IWorkoutExercise;

  @Input("previousExercises")
  public previousExercises: IPreviousWorkoutExercise[];
  public previousSets: IPreviousSet[] = [];

  @ViewChild("vc", { read: ViewContainerRef })
  public vc: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  private exerciseTypeComponentMap = {
    REPS: RepsSetComponent,
    REPS_WEIGHTS: RepsWeightsSetComponent,
    WEIGHTS: WeightsSetComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterContentInit() {
    let component = this.exerciseTypeComponentMap[this.exercise.type];
    if (!component) {
      console.error("Undefined sets component type. Need to map it.");
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    this.componentRef = this.vc.createComponent(componentFactory);
    this.renderComponent();
  }

  ngOnInit() {}

  ngOnChanges() {
    this.previousSets = this.buildPreviousSets();
    this.renderComponent();
  }

  private renderComponent() {
    if (this.componentRef) {
      this.componentRef.instance.formGroup = this.group;
      this.componentRef.instance.workout = this.workout;
      this.componentRef.instance.exercise = this.exercise;
      this.componentRef.instance.set = this.set;
      this.componentRef.instance.previousSets = this.previousSets;
    }
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
}
