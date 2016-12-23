import { Component, OnInit } from '@angular/core';
import { Guide, IGuide } from './guide';
import { GuideService } from './guide.service';

@Component({
    selector: 'guide-list',
    templateUrl: 'guide-list.component.html'
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