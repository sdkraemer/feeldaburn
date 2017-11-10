import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/zip'; 

import { IWorkout } from '../../core';

import { WorkoutFactoryService } from './workoutfactory.service';
import { WorkoutService } from '../workout.service';
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
        private workoutFactoryService: WorkoutFactoryService,
        private workoutService: WorkoutService,
    ) { }

    ngOnInit() {
        let workoutId = this.route.snapshot.params['id'];
        let guideId = this.route.snapshot.params['guide'];
        let workoutType = this.route.snapshot.params['workoutType'];
        this.workoutFactory = new WorkoutFactory();

        this.workoutFactoryService
            .createOrRetrieve(workoutId, workoutType, guideId)
            .subscribe(workout => {
                this.workout = workout;
                this.createForm(workout);
            });
    }


    private createForm(workout: IWorkout) {
        this.form = this.formBuilder.group({
            _id: [workout._id],
            type: [workout.type],
            name: [workout.name],
            notes: [workout.notes],
            createdAt: [workout.createdAt],
            isCompleted: [workout.isCompleted],
            completedAt: [workout.completedAt]
        });
    }

    save() {
        var formData = this.form.value;
        let workout = this.workoutFactory.createFromFormData(formData);
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