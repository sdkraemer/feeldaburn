import { Injectable } from '@angular/core';
import { Workout, IWorkout, RunningWorkout, StrengthTrainingWorkout, IRunningWorkout, IStrengthTrainingWorkout } from './workout-updated';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

//rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';


@Injectable()
export class WorkoutService {
    apiUrl: string = `${environment.apiUrl}/workouts`;
    workouts: IWorkout[];

    constructor(
        private http: Http,
        private authHttp: AuthHttp
    ) { }

    getWorkouts(): Observable<IWorkout[]> {
        return this.authHttp.get(this.apiUrl)
            .map((res: Response) => {
                this.workouts = res.json();
                return this.workouts;
            })
            .catch(this.handleError);
    }

    getWorkout(_id: string): Observable<IWorkout> {
        const url = `${this.apiUrl}/${_id}`;
        return this.authHttp
                    .get(url)
                    .map((response: Response) => {
                        let json = response.json();
                        let workout: IWorkout;
                        if(json.type == 'RUNNING'){
                            workout = new RunningWorkout(json);
                        }
                        else if(json.type == 'STRENGTH_TRAINING'){
                            workout = new StrengthTrainingWorkout(json);
                        }
                        return workout;
                    })
                    .catch(this.handleError); 
    }

    add(workout: IWorkout): Observable<boolean> {
        return this.authHttp
                    .post(this.apiUrl, workout)
                    .map((response: Response) => {
                        return this.isSuccessStatusCode(response.status);
                    })
                    .catch(this.handleError);
    }

    update(workout: IWorkout): Observable<boolean> {
        return this.authHttp.put(`${this.apiUrl}/${workout._id}`, workout)
                   .map((response: Response) => {
                       return this.isSuccessStatusCode(response.status);
                   })
                   .catch(this.handleError);
    }

    remove(_id: string){
        return this.authHttp.delete(`${this.apiUrl}/${_id}`)
                    .map((response: Response) => {
                        return this.isSuccessStatusCode(response.status);
                    })
                    .catch(this.handleError);
    }

    getPreviousStrengthTrainingWorkouts(guideId: string): Observable<IStrengthTrainingWorkout[]> {
        let url = `${this.apiUrl}/previous/${guideId}`;
        return this.authHttp
                    .get(url)
                    .map((response: Response) => {
                        let json = response.json();
                        let workouts: IWorkout[] = [];
                        json.forEach(workoutJson => {
                            workouts.push(new StrengthTrainingWorkout(workoutJson));
                        });
                        return workouts;
                    })
                    .catch(this.handleError);
            
    }

    private isSuccessStatusCode(statusCode) {
        return (statusCode >= 200 && statusCode < 300);
    }

    handleError(error: any){
        console.error('server error:', error);
        return Observable.throw(error || ' default error handlererererer');
    }
}