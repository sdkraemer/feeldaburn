import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Workout, WorkoutType, StrengthTrainingWorkoutType, RunningWorkoutType } from './workout';
import { WorkoutService } from './workout.service';



//rxjs
import 'rxjs/add/operator/do'; 

@Component({
    selector: 'workout',
    templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit {
    public form: FormGroup;
    public workout: Workout;
    
    //public workoutTypes =  WorkoutType;
    //public workoutType: WorkoutType;

    public workoutTypes = [
        { value: 'STRENGTH_TRAINING', display: 'Strength Training'},
        { value: 'RUNNING', display: 'Running'},
        { value: 'CYCLING', display: 'Cycling'}
    ];

    constructor(
        private formBuilder: FormBuilder,
        private workoutService: WorkoutService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            _id: [''],
            name: ['', Validators.required],
            guide: [''],
            notes: [''],
            type: [''],
            createdAt: [''],
            completedAt: ['']
        });

        this.route
            .params
            .map(params => params['id'])
            //.do(id => this._id = id)
            .subscribe(id => this.getWorkout(id));
    }

    private getWorkout(_id) {
        if(_id == 'New'){
            this.form.setValue({
                 _id: null,
                name: null,
                guide: null,
                notes: null,
                type: [''],
                createdAt: [''],
                completedAt: ['']
            });
        }
        else{
            this.workoutService.getWorkout(_id)
                .subscribe((workout) => {
                    this.form.setValue({
                        _id: workout._id,
                        name: workout.name,
                        guide: workout.guide,
                        notes: workout.notes,
                        type: workout.type,
                        createdAt: workout.createdAt,
                        completedAt: workout.completedAt
                    });
                    //to test
                    //this.workout.workoutType = new RunningWorkoutType();
                    //this.setWorkoutType();
                });
        }
    }

    

    // private setWorkoutType(){
    //     if(this.workout.workoutType instanceof StrengthTrainingWorkoutType){
    //         this.workoutType = this.workoutTypes.STRENGTH_TRAINING;
    //     }
    //     else if(this.workout.workoutType instanceof RunningWorkoutType){
    //         this.workoutType = this.workoutTypes.RUNNING;
    //     }
    // }

    onDelete(form){
        console.log("deleting workout");
        this.workoutService.remove(form.value._id)
            .subscribe((isSuccessful: boolean) => {
                this.goToWorkouts();
            });
    }

    onComplete(form){
        console.log("onSubmit");
        form.value.completedAt = new Date();
        //this.onSubmit(form); TODO fix this
    }

    onSubmit(){
        console.log("onSubmit");
        let workout = new Workout(this.form.value);

        if(workout._id){
            console.log("Saving an existing workout");
            this.workoutService.update(this.workout)
                .subscribe((isSuccessful: boolean) => {
                    this.goToWorkouts();
                });
        }
        else{
            console.log("Saving a new workout");
            this.workoutService.add(this.workout)
                .subscribe((isSuccessful: boolean) => {
                    this.goToWorkouts();
                });
        }
        this.goToWorkouts();
    }

    goToWorkouts() {
        this.router.navigate(['/workouts']);
    }
}