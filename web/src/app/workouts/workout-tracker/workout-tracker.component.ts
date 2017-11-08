import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkout, Workout, IRunningWorkout, RunningWorkout, IStrengthTrainingWorkout, StrengthTrainingWorkout } from '../../core';


import { WorkoutService } from '../workout.service';
import { GuideService } from '../../guides/guide.service';
import { WorkoutFactory } from "app/core/factories/workoutfactory";

@Component({
    selector: 'workout-tracker',
    templateUrl: 'workout-tracker.component.html'
})
export class WorkoutTrackerComponent implements OnInit {
    public workout: IWorkout;
    private form: FormGroup;
    private workoutFactory;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private workoutService: WorkoutService,
        private guideService: GuideService,
    ) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        let workoutType = this.route.snapshot.params['workoutType'];
        this.workoutFactory = new WorkoutFactory();
        
        this.createForm(workoutType);
        
        if(id){
            this.fillFormWithExistingWorkout(id);
        }
        else{
            let guideId = this.route.snapshot.params['guide'];
            this.createWorkout(workoutType, guideId);
        }
    }

    private fillFormWithExistingWorkout(workoutId) {
        this.getWorkout(workoutId, () => {
                this.form.patchValue({
                    _id: this.workout._id,
                    name: this.workout.name,
                    type: this.workout.type,
                    notes: this.workout.notes,
                    createdAt: this.workout.createdAt,
                    isCompleted: this.workout.isCompleted,
                    completedAt: this.workout.completedAt
                });
            });
    }

    private createWorkout(workoutType, guideId){
        if(guideId) {
            this.guideService.getGuide(guideId).subscribe((guide) => {
                this.workout = this.workoutFactory.createFromGuide(guide);
            });
        }
        else{
            this.workout = this.workoutFactory.createFromWorkoutType(workoutType);
        }
    }

    private createForm(workoutType){
        this.form = this.formBuilder.group({
            _id: [''],
            type: [workoutType],
            name: [''],
            notes: [''],
            createdAt: [''],
            isCompleted: [false],
            completedAt: ['']
        });
    }

    getWorkout(id, completed){
        this.workoutService.getWorkout(id)
            .subscribe(workout => {
                this.workout = workout;
            },
            error => console.log('Could not load guide: '+id),
            completed);
    }

    save() {
        var formData = this.form.value;
        let workout = WorkoutFactory.create(formData);
        this.persistWorkout(workout);
    }

    private persistWorkout(workout: IWorkout) {
        let isWorkoutNew = !workout._id;
        if(isWorkoutNew){
            this.workoutService
                .add(workout)
                .subscribe((isSuccessful: boolean) => {
                    if(isSuccessful){
                        this.goToWorkouts();
                    }
                });
        }
        else{
            this.workoutService
                .update(workout)
                .subscribe((isSuccessful: boolean) => {
                    if(isSuccessful){
                        this.goToWorkouts();
                    }
                });
        }
    }

    delete() {
        let isWorkoutSaved = !this.workout._id;
        if(isWorkoutSaved){
            this.goToWorkouts();
        }
        else{
            this.workoutService
                .remove(this.workout._id)
                .subscribe((isSuccessful: boolean) => {
                    if(isSuccessful){
                        this.goToWorkouts();
                    } 
                });
        }
    }

    goToWorkouts() {
        this.router.navigate(['/workouts']);
    }
}