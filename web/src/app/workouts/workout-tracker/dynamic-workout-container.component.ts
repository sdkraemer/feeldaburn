import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { IStrengthTrainingWorkout } from "app/core";
import { StrengthTrainingWorkoutComponent } from "./strength-training-workout/strength-training-workout.component";
import { RunningWorkoutComponent } from "./running-workout/running-workout.component";

@Component({
  selector: "dynamic-workout-container",
  templateUrl: "dynamic-workout-container.component.html"
})
export class DynamicWorkoutContainerComponent implements OnInit {
  @Input("form")
  public form: FormGroup;

  @Input("workout")
  public workout: IStrengthTrainingWorkout;

  @ViewChild("dynamicWorkoutComponentContainer", { read: ViewContainerRef })
  public dynamicWorkoutComponentContainer: ViewContainerRef;
  private componentRef: ComponentRef<any>;

  private workoutTypeComponentMap = {
    RUNNING: RunningWorkoutComponent,
    STRENGTH_TRAINING: StrengthTrainingWorkoutComponent
  };

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngAfterContentInit() {
    let component = this.workoutTypeComponentMap[this.workout.type];
    if (!component) {
      console.error(
        "Undefined workout component type. Map it in DynamicWorkoutContainerComponent"
      );
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component
    );
    this.componentRef = this.dynamicWorkoutComponentContainer.createComponent(
      componentFactory
    );
    this.renderComponent();
  }

  ngOnChanges() {
    this.renderComponent();
  }

  private renderComponent() {
    if (this.componentRef) {
      this.componentRef.instance.workout = this.workout;
      this.componentRef.instance.form = this.form;
    }
  }
}
