import { Component, OnInit } from '@angular/core';
import {trigger, transition, style, animate} from "@angular/animations";
import { Guide, IGuide } from '../core';
import { GuideService } from './guide.service';

@Component({
    selector: 'guide-list',
    templateUrl: 'guide-list.component.html',
    styles: [`
        .card {
            margin-bottom: 1em;
            width: 18rem;
        }
    `],
    animations: [
        trigger('guideEnter', [
            transition(":enter", [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ])
        ])
    ]
})
export class GuideListComponent implements OnInit {
    guides: Guide[];
    constructor(
        private guideService: GuideService) { }

    ngOnInit() {
        this.getGuides();
    }

    getGuides() {                      
        this.guideService.getGuides()
            .subscribe((guides: IGuide[]) => {
                this.guides = guides;
            }); 
    }
}