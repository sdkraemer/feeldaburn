//Followed: https://v5.material.angular.io/guide/creating-a-custom-form-field-control#-code-focused-code-
//https://v5.material.angular.io/components/form-field/examples

import {
  Component,
  OnInit,
  Input,
  HostBinding,
  Optional,
  Self,
  ElementRef,
  HostListener,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  NgControl,
  ControlValueAccessor
} from "@angular/forms";
import { MatFormFieldControl } from "@angular/material";
import { Subject } from "rxjs/Subject";
import { FocusMonitor } from "@angular/cdk/a11y";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { TimeDuration } from "app/core";

@Component({
  selector: "time-duration-control",
  templateUrl: "time-duration-control.component.html",
  styles: [
    `
      div {
        display: flex;
      }

      input {
        border: none;
        background: none;
        padding: 0;
        outline: none;
        font: inherit;
        text-align: center;
      }

      .divider {
        font-weight: 700;
      }
    `
  ],
  providers: [
    { provide: MatFormFieldControl, useExisting: TimeDurationControlComponent }
  ]
})
export class TimeDurationControlComponent
  implements
    MatFormFieldControl<TimeDuration>,
    ControlValueAccessor,
    OnChanges {
  parts: FormGroup;
  stateChanges = new Subject<void>();
  static nextId = 0;
  focused = false;
  private _onChange = (_: any) => {};
  private onTouch: Function;
  errorState = false;
  controlType = "time-duration-control";

  @HostBinding()
  id = `time-duration-control-${TimeDurationControlComponent.nextId++}`;

  @Input()
  get value(): TimeDuration | null {
    let value = this.parts.value;
    if (value.minutes.length > 0 && value.seconds.length > 0) {
      return new TimeDuration(value.minutes, value.seconds);
    }
    this.stateChanges.next();
    return null;
  }
  set value(timeDuration: TimeDuration | null) {
    timeDuration = timeDuration || new TimeDuration(0, 0);
    this.parts.setValue({
      minutes: timeDuration.minutes,
      seconds: timeDuration.seconds
    });
    this.stateChanges.next();
    this._onChange(timeDuration);
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  get empty() {
    let n = this.parts.value;
    return !n.minutes && !n.seconds;
  }

  @HostBinding("class.floating")
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;

  @HostBinding("attr.aria-describedby") describedBy = "";

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(" ");
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != "input") {
      this.elRef.nativeElement.querySelector("input").focus();
    }
  }

  constructor(
    fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.parts = fb.group({ minutes: "", seconds: "" });
    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
  }

  writeValue(value: TimeDuration) {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouch = fn;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stateChanges.next();
  }

  //I ended up getting stuck on this. Originally this wasn't included, so angular did not know
  //that the value of the control was being changed until I listened for changes.
  @HostListener("change", ["$event"])
  onChange(event) {
    //const value = event.target.value;
    let value = this.parts.value;
    let minutes = value.minutes + "";
    let seconds = value.seconds + "";
    let timeDuration = null;
    if (minutes.length > 0 && seconds.length > 0) {
      timeDuration = new TimeDuration(+minutes, +seconds);
    }
    this.value = timeDuration;
  }

  //setDisabledState?(isDisabled: boolean): void {
  //  throw new Error("Method not implemented.");
  //}
}
