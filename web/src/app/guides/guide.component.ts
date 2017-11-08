import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {trigger, transition, style, animate} from "@angular/animations";

import { IGuide, Guide, workoutType } from '../core';
import { GuideService } from './guide.service';

//rxjs
import 'rxjs/add/operator/do';

import * as _ from 'lodash';

function orderChangedTransition(from, to): boolean {
    return from != 'void' && to != 'void' && from != to;
}

@Component({
    selector: 'guide',
    templateUrl: 'guide.component.html',
    styles: [`
        .card {
            margin-bottom: 1em;
        }
    `],
    animations: [
        trigger('exerciseReordered', [
            transition("* => *", [
                style({ opacity: 0 }),
                animate(500, style({ opacity: 1 }))
            ]),
            //transition(":enter", style({ opacity: 1 })),
            //transition(":leave", style({ opacity: 1 })),
            // transition(orderChangedTransition as any, [
            //     style({ opacity: 0 }),
            //     animate(500, style({ opacity: 1 }))
            // ])
        ])
    ]
})
export class GuideComponent implements OnInit {
    private _id: any;
    public form: FormGroup;

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
        if (this._id == 'New') {
            this.form.setValue({
                _id: null,
                name: null,
                description: null,
                createdAt: null,
                exercises: []
            });
        }
        else {
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
                                type: [exercise.type, Validators.required],
                                order: [exercise.order]
                            })
                        );
                    });
                });
        }
    }

    delete() {
        this.guideService.remove(this.form.value._id)
            .subscribe((isSuccessful: boolean) => {
                this.goToGuides();
            });
    }

    removeExercise(exerciseIndex) {
        const control = <FormArray>this.form.controls['exercises'];
        control.removeAt(exerciseIndex);
    }

    save() {
        let guide = new Guide(this.form.value);

        if (guide._id) {
            this.guideService.update(guide)
                .subscribe((isSuccessful: boolean) => {
                    this.goToGuides();
                });
        }
        else {
            this.guideService.add(guide)
                .subscribe((isSuccessful: boolean) => {
                    this.goToGuides();
                });
        }
        this.goToGuides();
    }

    initExercise(exercisesIndex) {
        return this.formBuilder.group({
            _id: [null],
            name: ['', Validators.required],
            sided: [null],
            type: ['REPS', Validators.required],
            order: exercisesIndex
        });
    }

    addExercise() {
        const exercisesControl = <FormArray>this.form.controls['exercises'];
        exercisesControl.push(this.initExercise(exercisesControl.length));
    }

    moveExerciseUp(exercise, index) {
        let exercisesArray = <FormArray>this.form.controls['exercises'];

        let moveControlUp = <FormGroup>this.form.controls['exercises']['controls'][index];
        let moveControlDown = <FormGroup>this.form.controls['exercises']['controls'][index-1];
        
        exercisesArray.removeAt(index-1);
        exercisesArray.insert(index, moveControlDown);

        <FormGroup>this.form.controls['exercises']['controls'][index].patchValue({
            order: index
        });
        <FormGroup>this.form.controls['exercises']['controls'][index-1].patchValue({
            order: index-1
        });

        return false;
    }

    showSidedSelector(exercise) {
        let type = exercise.controls['type'].value;
        return type == "REPS" || type == "WEIGHTS";
    }

    goToGuides() {
        this.router.navigate(['/guides']);
    }
}