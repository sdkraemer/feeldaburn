import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Guide } from './guide';
import { GuideService } from './guide.service';

//rxjs
import 'rxjs/add/operator/do'; 

@Component({
    selector: 'guide',
    templateUrl: 'guide.component.html'
})
export class GuideComponent implements OnInit {
    public guide: Guide;

    constructor(
        private guideService: GuideService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() { 
        this.route
            .params
            .map(params => params['id'])
            //.do(id => this._id = id)
            .subscribe(id => this.getGuide(id));
    }

    private getGuide(_id) {
        if(_id == 'New'){
            this.guide = new Guide({_id: null, name: null, description: null, createdAt: null});
        }
        else{
            this.guideService.getGuide(_id)
                .subscribe((guide) => this.guide = guide);
        }
    }

    onDelete(form){
        console.log("deleting guide");
        console.dir(form);
        this.guideService.remove(form.value._id)
            .subscribe((isSuccessful: boolean) => {
                this.goToGuides();
            });
    }

    onSubmit(form){
        this.guide.name = form.value.name;
        this.guide.description = form.value.description;

        if(form.value._id){
            console.log("Saving an existing guide");
            this.guideService.update(this.guide)
                .subscribe((isSuccessful: boolean) => {
                    this.goToGuides();
                });
        }
        else{
            console.log("Saving a new guide");
            this.guideService.add(this.guide)
                .subscribe((isSuccessful: boolean) => {
                    this.goToGuides();
                });
        }
        this.goToGuides();
    }

    goToGuides() {
        this.router.navigate(['/guides']);
    }
}