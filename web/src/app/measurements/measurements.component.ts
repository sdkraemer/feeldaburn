import { Component, OnInit } from '@angular/core';

import { Measurement, WeightMeasurement } from '../core'

@Component({
    selector: 'measurements',
    templateUrl: 'measurements.component.html'
})

export class MeasurementsComponent implements OnInit {
    measurements: Measurement[];
    constructor() { 
        this.measurements = [];
    }

    ngOnInit() { 
        this.buildMockData();
    }

    private buildMockData() {
        let weight1 = new WeightMeasurement(200.4, '1', 'WEIGHT', new Date('2017-06-23 02:26:22.092Z'));
        this.measurements.push(weight1);
    }
}