import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { WorkoutEvent } from './calendar-events';
import { IWorkout } from '../core/';

//rxjs
import { Observable } from 'rxjs/Observable';
import {map, catchError} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CalendarService {
    apiUrl: string = `${environment.apiUrl}/workouts`;

    constructor(
        private http: HttpClient
    ) { }

    getWorkoutEvents(searchHttpParams: HttpParams) {
        return this.http
            .get<IWorkout[]>(this.apiUrl, {
                params: {},
                headers: new HttpHeaders().set(
                    'Authorization', `Bearer ${localStorage.getItem('access_token')}`
                )
            })
            .pipe(
                map((workouts: IWorkout[]) => {
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
                }),
                catchError(this.handleError('getWorkoutEvents', []))
            );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }
}