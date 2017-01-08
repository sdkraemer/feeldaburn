import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { IGuide } from '../../guides/guide';
import { GuideService } from '../../guides/guide.service';

@Component({
    selector: '<strength-training-picker></strength-training-picker>',
    templateUrl: 'strength-training-picker.component.html'
})
export class StrengthTrainingPickerComponent implements OnInit {
    @Input("form")
    private form: FormGroup;
    private guides: IGuide[];

    constructor(
        private guideService: GuideService
    ) { }

    ngOnInit() { 
        this.getGuides();
    }

    getGuides() {
        this.guideService
            .getGuides()
            .subscribe((guides) => {
                this.guides = guides;
            });
    }
}