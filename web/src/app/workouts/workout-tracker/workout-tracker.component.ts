import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { IWorkout, Workout, IRunningWorkout, RunningWorkout, IStrengthTrainingWorkout, StrengthTrainingWorkout } from '../workout-updated';

import { WorkoutService } from '../workout.service';
import { GuideService } from '../../guides/guide.service';

@Component({
    selector: 'workout-tracker',
    templateUrl: 'workout-tracker.component.html'
})
export class WorkoutTrackerComponent implements OnInit {
    private workout: IWorkout;
    private form: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private workoutService: WorkoutService,
        private guideService: GuideService
    ) { }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        let workoutType = this.route.snapshot.params['workoutType'];
        
        this.createForm(workoutType);
        
        if(id){
            this.getWorkout(id, () => {
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
        else{
            
            let guide_id = this.route.snapshot.params['guide'];

            this.workout = this.createWorkout({
                type: workoutType,
                guide: guide_id
            });
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

    createWorkout(options) {
        let workout: IWorkout;
        if(options.type == 'RUNNING'){
            workout = new RunningWorkout({
                _id: null
            });
        }
        else if(options.type == 'STRENGTH_TRAINING'){
            workout = new StrengthTrainingWorkout({
                _id: null,
                guide: options.guide,
                exercises: []
            });
        }
        return workout;
    }

    save() {
        var formData = this.form.value;
        let workout :IWorkout = null;
        if(formData.type == 'RUNNING'){
            workout = new RunningWorkout(formData);
        }
        else if(formData.type = 'STRENGTH_TRAINING'){
            workout = new StrengthTrainingWorkout(formData);
        }

        if(workout._id){
            this.workoutService
                .update(workout)
                .subscribe((isSuccessful: boolean) => {
                    if(isSuccessful){
                        this.goToWorkouts();
                    }
                });

        }
        else{
            this.workoutService
                .add(workout)
                .subscribe((isSuccessful: boolean) => {
                    if(isSuccessful){
                        this.goToWorkouts();
                    }
                });
        }
    }

    delete() {
        this.workoutService
            .remove(this.workout._id)
            .subscribe((isSuccessful: boolean) => {
                if(isSuccessful){
                    this.goToWorkouts();
                } 
            });
    }

    goToWorkouts() {
        this.router.navigate(['/workouts']);
    }
}