import { Injectable } from '@angular/core';
import { Workout, IWorkout } from './workout';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

//rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';


@Injectable()
export class WorkoutService {
    apiUrl: string = 'http://localhost/api/workouts';
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

    getWorkout(_id: string): Observable<Workout> {
        const url = `${this.apiUrl}/${_id}`;
        return this.authHttp
                    .get(url)
                    .map((response: Response) => {
                        return response.json();
                    })
                    .catch(this.handleError); 
    }

    add(workout: Workout): Observable<boolean> {
        return this.authHttp.post(this.apiUrl, workout)
                   .map((response: Response) => {
                        return this.isSuccessStatusCode(response.status);
                   })
                   .catch(this.handleError);
    }

    update(workout: Workout): Observable<boolean> {
        return this.authHttp.put(`${this.apiUrl}/${workout._id}`, workout)
                   .map((response: Response) => {
                       return this.isSuccessStatusCode(response.status);
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