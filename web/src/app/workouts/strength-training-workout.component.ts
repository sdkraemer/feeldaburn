import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Guide } from '../guides/guide';
import { GuideService } from '../guides/guide.service';

@Component({
    selector: 'strength-training-workout',
    templateUrl: 'strength-training-workout.component.html'
})
export class StrengthTrainingWorkoutComponent implements OnInit {
    @Input('group')
    public form: FormGroup;
    public guides: Guide[];

    constructor(
        private guideService: GuideService
    ) { }

    ngOnInit() { 
        this.getGuides();
    }

    private getGuides(){
        this.guideService.getGuides()
            .subscribe((guides) => {
                this.guides = guides;
            });
    }
}