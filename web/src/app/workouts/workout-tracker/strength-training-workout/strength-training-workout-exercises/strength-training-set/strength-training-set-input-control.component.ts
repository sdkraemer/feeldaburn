import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "strength-training-set-input-control",
  templateUrl: "strength-training-set-input-control.component.html"
})
export class StrengthTrainingSetInputControlComponent implements OnInit {
  @Input("formGroup") public formGroup: FormGroup;
  @Input("control") private control: FormControl;
  @Input("name") public name;

  public currentFormControlName: string;

  constructor() {}

  ngOnInit() {
    this.currentFormControlName = "repetitions";
  }

  decrement($event) {
    $event.stopPropagation();
    let isNumberAndGreaterThanZero =
      Number(this.control.value) != NaN && this.control.value > 0;
    if (isNumberAndGreaterThanZero) {
      this.control.setValue(+this.control.value - 1);
    }
  }

  increment($event) {
    $event.stopPropagation();
    if (Number(this.control.value) != NaN) {
      this.control.setValue(+this.control.value + 1);
    }
  }
}
