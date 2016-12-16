import { Component, OnInit, Input } from '@angular/core';
import { Workout } from './workout';

@Component({
    selector: 'workout-detail',
    templateUrl: './workout-detail.component.html'
})
export class WorkoutDetailComponent implements OnInit {
    @Input() workout: Workout;

    constructor() { }

    ngOnInit() { }

}