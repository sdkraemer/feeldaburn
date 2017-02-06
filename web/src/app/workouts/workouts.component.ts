import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'workouts',
    templateUrl: 'workouts.component.html',
    styles: [`
        h1 {
            font-family: 'Aeromatics';
        }
    `]
})
export class WorkoutsComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}