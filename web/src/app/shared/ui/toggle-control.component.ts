import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'toggle-control',
    template: `
    <button type="button" class="btn btn-secondary" [class.active]="value == true" (click)="onClick(true);">Yes</button> 
    <button type="button" class="btn btn-secondary" [class.active]="value != true" (click)="onClick(false);">No</button>`,
    providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ToggleControlComponent),
        multi: true
    }]
})

export class ToggleControlComponent implements ControlValueAccessor {
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