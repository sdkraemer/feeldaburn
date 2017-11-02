import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { IGuide } from '../../core';
import { GuideService } from '../../guides/guide.service';

@Component({
    selector: '<strength-training-picker></strength-training-picker>',
    templateUrl: 'strength-training-picker.component.html',
    styles: [`
        .strength-training-picker-wrapper {
            margin-top: 1em;
            padding-left: 2em;
        }
    `]
})
export class StrengthTrainingPickerComponent implements OnInit {
    @Input("form")
    public form: FormGroup;
    public guides: IGuide[];

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