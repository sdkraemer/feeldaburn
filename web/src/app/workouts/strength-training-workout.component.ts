import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Guide } from '../guides/guide';
import { GuideService } from '../guides/guide.service';

import { StrengthTrainingWorkoutType } from './workout';

@Component({
    selector: 'strength-training-workout-old',
    templateUrl: 'strength-training-workout.component.html'
})
export class StrengthTrainingWorkoutComponent implements OnInit {
    @Input('form')
    public form: FormGroup;

    @Input('workoutType')
    public workoutType: StrengthTrainingWorkoutType;

    public guides: Guide[];
    public selectedGuide: Guide;

    constructor(
        private formBuilder: FormBuilder,
        private guideService: GuideService
    ) { }

    ngOnInit() {
        this.removeExistingControl();
        if(!this.workoutType){
            this.workoutType = new StrengthTrainingWorkoutType({
                _id: null,
                guide: null,
                exercises: []
            });
        }
        this.form.addControl('workoutType', this.formBuilder.group({
            _id: [this.workoutType._id],
            guide: [this.workoutType.guide]
        }));
        this.getGuides();
        if(this.workoutType.guide){
            this.getGuide(this.workoutType.guide);
        }
    }

    private removeExistingControl(){
        if(this.form.get('workoutType')){
            this.form.removeControl('workoutType');
        }
    }

    public onGuideChange(_id){
        this.getGuide(_id);
    }

    private getGuides(){
        this.guideService
            .getGuides()
            .subscribe((guides) => {
                this.guides = guides;
            });
    }

    private getGuide(_id: string){
        this.guideService
            .getGuide(_id)
            .subscribe((guide) => {
                this.selectedGuide = guide;
                //build exercises from guide exercises
            },
            error => console.log('Could not load guide: '+_id),
            () => this.populateExercisesOnWorkout());
    }

    private populateExercisesOnWorkout() {
        if(this.workoutType.exercises.length == 0){
            this.selectedGuide.exercises.forEach(function(exercise){
                console.log(`building ${exercise.type} exercise ${exercise.name}`);
            });
        }
    }
}