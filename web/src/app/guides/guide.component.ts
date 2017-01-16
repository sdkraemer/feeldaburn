import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IGuide, Guide, workoutType } from './guide';
import { GuideService } from './guide.service';

//rxjs
import 'rxjs/add/operator/do'; 

@Component({
    selector: 'guide',
    templateUrl: 'guide.component.html'
})
export class GuideComponent implements OnInit {
    private _id: any;
    public form: FormGroup;
    public exerciseTypes = [
        { value: 'REPS', display: 'Repititions'},
        { value: 'WEIGHTS', display: 'Repititions With Weights'},
        { value: 'COMPLETED', display: 'Completed'}
    ];

    constructor(
        private formBuilder: FormBuilder,
        private guideService: GuideService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            _id: [''],
            name: ['', Validators.required],
            description: [''],
            createdAt: [''],
            exercises: this.formBuilder.array([])
        });

        this.route
            .params
            .map(params => params['id'])
            .do(id => this._id = id)
            .subscribe(id => this.getGuide());
    }

    private getGuide() {
        if(this._id == 'New'){
            this.form.setValue({
                _id: null,
                name: null,
                description: null,
                createdAt: null, 
                exercises: []
            });
        }
        else{
            this.guideService.getGuide(this._id)
                .subscribe((guide) => {
                    this.form.setValue({
                        _id: guide._id,
                        name: guide.name,
                        description: guide.description,
                        createdAt: guide.createdAt,
                        exercises: []
                    });
                    const control = <FormArray>this.form.controls['exercises'];
                    guide.exercises.forEach(exercise => {
                        control.push(
                            this.formBuilder.group({
                                _id: [exercise._id],
                                name: [exercise.name, Validators.required],
                                sided: [exercise.sided],
                                type: [exercise.type, Validators.required]
                            })
                        );
                    });
                });
        }
    }

    delete() {
        console.log("deleting guide");
        this.guideService.remove(this.form.value._id)
            .subscribe((isSuccessful: boolean) => {
                this.goToGuides();
            });
    }

    removeExercise(exerciseIndex){
        console.log("TODO: remove exercise");
    }

    save() {
        let guide = new Guide(this.form.value);

        if(guide._id){
            console.log("Saving an existing guide");
            this.guideService.update(guide)
                .subscribe((isSuccessful: boolean) => {
                    this.goToGuides();
                });
        }
        else{
            console.log("Saving a new guide");
            this.guideService.add(guide)
                .subscribe((isSuccessful: boolean) => {
                    this.goToGuides();
                });
        }
        this.goToGuides();
    }

    initExercise() {
        return this.formBuilder.group({
            _id: [null],
            name: ['', Validators.required],
            sided: [null],
            type: ['', Validators.required]
        });
    }

    addExercise() {
        const control = <FormArray>this.form.controls['exercises'];
        control.push(this.initExercise());
    }

    goToGuides() {
        this.router.navigate(['/guides']);
    }
}