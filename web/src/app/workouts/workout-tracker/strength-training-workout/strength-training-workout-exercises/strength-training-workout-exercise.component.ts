import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ComponentRef,
  ViewChild,
  ComponentFactoryResolver
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Observable } from "rxjs/Observable";
import { IWorkoutExercise, IStrengthTrainingWorkout } from "app/core";

import { CompletedExerciseTypeComponent } from "./strength-training-exercises/completed-exercise-type/completed-exercise-type.component";
import { SecondsExerciseTypeComponent } from "./strength-training-exercises/seconds-exercise-type/seconds-exercise-type.component";
import { SetsExerciseTypeComponent } from "./strength-training-exercises/sets-exercise-type/sets-exercise-type.component";

@Component({
  selector: "strength-training-workout-exercise",
  templateUrl: "strength-training-workout-exercise.component.html"
})
export class StrengthTrainingWorkoutExerciseComponent implements OnInit {
  @Input("group") public group: FormGroup;

  @Input("exercise") public exercise: IWorkoutExercise;

  @Input("showExercise") public showExercise: boolean;

  @Input("workout") public workout: IStrengthTrainingWorkout;

  @ViewChild("exerciseComponentContainer", { read: ViewContainerRef })
  public exerciseComponentContainer: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  private exerciseTypeComponentMap = {
    REPS: SetsExerciseTypeComponent,
    REPS_WEIGHTS: SetsExerciseTypeComponent,
    WEIGHTS: SetsExerciseTypeComponent,
    COMPLETED: CompletedExerciseTypeComponent,
    SECONDS: SecondsExerciseTypeComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterContentInit() {
    let component = this.exerciseTypeComponentMap[this.exercise.type];
    if (!component) {
      console.error("Undefined exercise component type. Need to map it.");
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    this.componentRef = this.exerciseComponentContainer.createComponent(
      componentFactory
    );
    this.renderComponent();
  }

  ngOnChanges() {
    this.renderComponent();
  }

  private renderComponent() {
    if (this.componentRef) {
      this.componentRef.instance.form = this.group;
      this.componentRef.instance.workout = this.workout;
      this.componentRef.instance.exercise = this.exercise;
    }
  }
}
