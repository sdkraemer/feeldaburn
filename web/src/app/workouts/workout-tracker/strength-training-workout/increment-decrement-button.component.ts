import { Component, OnInit, Input } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
    selector: 'increment-decrement-button',
    templateUrl: 'increment-decrement-button.component.html'
})
export class IncrementDecrementButtonComponent implements OnInit {
    @Input("control")
    private control: FormControl;

    @Input("operation")
    public operation: string;

    private display: string;
    private operator: Function;

    constructor() { }

    ngOnInit() {
        if(this.operation == "increment"){
            this.display = "+";
            this.operator = () => {
                if(Number(this.control.value) != NaN){
                    this.control.setValue(+this.control.value + 1);
                }
            };
        }
        else if(this.operation == "decrement"){
            this.display = "-";
            this.operator = () => {
                if(Number(this.control.value) != NaN){
                    this.control.setValue(+this.control.value - 1);
                }
            };
        }
    }

    onClick(){
        this.operator();
    }
}