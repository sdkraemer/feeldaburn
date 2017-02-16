import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

import { WorkoutEvent } from './calendar-events';
import { IWorkout } from '../workouts/workout-updated';

//rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

@Injectable()
export class CalendarService {
    apiUrl: string = `${environment.apiUrl}/workouts`;

    constructor(
        private authHttp: AuthHttp
    ) { }

    getWorkoutEvents(search: URLSearchParams): Observable<WorkoutEvent[]> {
        return this.authHttp.get(this.apiUrl, {search})
            .map((res: Response) => {
                let workouts: IWorkout[] = res.json();
                return workouts.map((workout: IWorkout) => {
                    return {
                        title: workout.name,
                        start: new Date(workout.completedAt),
                        color: {
                            primary: '#1e90ff',
                            secondary: '#D1E8FF'
                        },
                        workout: workout
                    };
                })
            })
            .catch(this.handleError);
    }

    handleError(error: any){
        console.error('server error:', error);
        return Observable.throw(error || ' default error handlererererer');
    }
}