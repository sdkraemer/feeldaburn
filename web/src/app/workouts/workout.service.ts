import { Injectable } from "@angular/core";
import {
  Workout,
  IWorkout,
  RunningWorkout,
  StrengthTrainingWorkout,
  IRunningWorkout,
  IStrengthTrainingWorkout
} from "../core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { environment } from "../../environments/environment";

//rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class WorkoutService {
  apiUrl: string = `${environment.apiUrl}/workouts`;
  workouts: IWorkout[];

  constructor(private http: HttpClient) {}

  getWorkouts() {
    return this.http
      .get<IWorkout[]>(this.apiUrl, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(catchError(this.handleError("getWorkouts", [])));
  }

  getWorkout(_id: string) {
    const url = `${this.apiUrl}/${_id}`;
    return this.http
      .get<IWorkout>(url, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(catchError(this.handleError("getWorkout", [])));
  }

  add(workout: IWorkout) {
    return this.http
      .post(this.apiUrl, workout, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        map((response: Response) => {
          return true;
        }),
        catchError(this.handleError("add", []))
      );
  }

  update(workout: IWorkout) {
    return this.http
      .put(`${this.apiUrl}/${workout._id}`, workout, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        map((response: Response) => {
          return true;
        }),
        catchError(this.handleError("update", []))
      );
  }

  remove(_id: string) {
    return this.http
      .delete(`${this.apiUrl}/${_id}`, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        ),
        responseType: "text"
      })
      .pipe(
        tap(response => {
          return true;
        }),
        catchError(this.handleError("remove, []"))
      );
  }

  getPreviousStrengthTrainingWorkouts(guideId: string) {
    let url = `${this.apiUrl}/previous/${guideId}`;
    return this.http
      .get<IStrengthTrainingWorkout[]>(url, {
        headers: new HttpHeaders().set(
          "Authorization",
          `Bearer ${localStorage.getItem("access_token")}`
        )
      })
      .pipe(
        catchError(this.handleError("getPreviousStrengthTrainingWorkouts", []))
      );
  }

  private isSuccessStatusCode(statusCode) {
    return statusCode >= 200 && statusCode < 300;
  }

  private handleError<T>(operation = "operation", result?: T) {
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
