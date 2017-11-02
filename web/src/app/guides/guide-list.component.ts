import { Component, OnInit } from '@angular/core';
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
    `]
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