import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'guide-sided-selector',
    templateUrl: 'guide-sided-selector.component.html',
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GuideSidedSelectorComponent),
    multi: true
  }]
})
export class GuideSidedSelectorComponent implements ControlValueAccessor {
    private onModelChange: Function;
    private onTouch: Function;
    public value: boolean = false;
    private focused: string;

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