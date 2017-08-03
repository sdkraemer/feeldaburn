import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'exercise-type-control',
    templateUrl: 'exercise-type-control.component.html',
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ExerciseTypeControlComponent),
    multi: true
  }]
})
export class ExerciseTypeControlComponent implements ControlValueAccessor {
    private onModelChange: Function;
    private onTouch: Function;
    private value: boolean = false;
    private focused: string;

    public exerciseTypes = [
        { "display": "Repetitions", "value": "REPS" },
        { "display": "Reps w/ Weights", "value": "WEIGHTS" },
        { "display": "Completed", "value": "COMPLETED" },
        { "display": "Seconds", "value": "SECONDS" },
    ]

    public registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    public writeValue(value: boolean) {
        this.value = value;
    }

    private onChange(value: boolean) {
        this.value = value;
        this.onModelChange(value);
    }

    private onBlur(value: string) {
        this.focused = '';
    }

    private onFocus(value: string) {
        this.focused = value;
        this.onTouch();
    }

    onClick(value: boolean){
        this.value = value;
        this.onModelChange(value);
    }
}