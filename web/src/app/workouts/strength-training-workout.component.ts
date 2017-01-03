import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Guide } from '../guides/guide';
import { GuideService } from '../guides/guide.service';

@Component({
    selector: 'strength-training-workout',
    templateUrl: 'strength-training-workout.component.html'
})
export class StrengthTrainingWorkoutComponent implements OnInit {
    @Input('form')
    public form: FormGroup;
    public guides: Guide[];

    constructor(
        private formBuilder: FormBuilder,
        private guideService: GuideService
    ) { }

    ngOnInit() {
        this.removeExistingControl();
        this.form.addControl('workoutType', this.formBuilder.group({
            guide: ['']
        }));
        this.getGuides();
    }

    private removeExistingControl(){
        if(this.form.get('workoutType')){
            this.form.removeControl('workoutType');
        }
    }

    private getGuides(){
        this.guideService.getGuides()
            .subscribe((guides) => {
                this.guides = guides;
            });
    }
}