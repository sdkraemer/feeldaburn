import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'workout-type',
    templateUrl: 'workout-type.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => WorkoutTypeComponent),
        multi: true
    }],
    styles: [`
        input {
            border: 0;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }
    `]
})
export class WorkoutTypeComponent implements ControlValueAccessor {
    private onModelChange: Function;
    private onTouch: Function;
    private value: string;
    private focused: string;

    private workoutTypes = [
        { value: 'STRENGTH_TRAINING', display: 'Strength Training' },
        { value: 'RUNNING', display: 'Running' },
        { value: 'CYCLING', display: 'Cycling' }
    ];

    public registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    public registerOnTouched(fn: Function) {
        this.onTouch = fn;
    }

    public writeValue(value: string) {
        this.value = value;
    }

    private onChange(value: string) {
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
}