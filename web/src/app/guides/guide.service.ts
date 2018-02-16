import { Injectable } from '@angular/core';
import { Guide, IGuide } from '../core';
import { Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

//rxjs
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class GuideService {
    apiUrl: string = `/api/guides`;

    constructor(
        private http: HttpClient
    ) { }

    getGuides() {
        return this.http
            .get<IGuide[]>(this.apiUrl, {
                headers: new HttpHeaders().set(
                    'Authorization', `Bearer ${localStorage.getItem('access_token')}`
                )
            })
            .pipe(
                catchError(this.handleError('getGuides', []))
            );
    }

    getGuide(_id: string){
        const url = `${this.apiUrl}/${_id}`;
        return this.http
            .get<IGuide>(url, {
                headers: new HttpHeaders().set(
                    'Authorization', `Bearer ${localStorage.getItem('access_token')}`
                )
            })
            .pipe(
                catchError(this.handleError('getGuide', []))
            );
    }

    add(guide: IGuide) {
        return this.http
            .post(this.apiUrl, guide, {
                headers: new HttpHeaders().set(
                    'Authorization', `Bearer ${localStorage.getItem('access_token')}`
                )
            })
            .pipe(
                map((response: Response) => {
                    return this.isSuccessStatusCode(response.status);
                }),
                catchError(this.handleError('add', []))
            );
    }

    update(guide: IGuide) {
        return this.http
            .put(`${this.apiUrl}/${guide._id}`, guide, {
                headers: new HttpHeaders().set(
                    'Authorization', `Bearer ${localStorage.getItem('access_token')}`
                )
            })
            .pipe(
                map((response: Response) => {
                    return this.isSuccessStatusCode(response.status);
                }),
                catchError(this.handleError('update', []))
            );
    }

    remove(_id: string) {
        return this.http
            .delete(`${this.apiUrl}/${_id}`, {
                headers: new HttpHeaders().set(
                    'Authorization', `Bearer ${localStorage.getItem('access_token')}`
                )
            })
            .pipe(
                map((response: Response) => {
                    return this.isSuccessStatusCode(response.status);
                }),
                catchError(this.handleError('remove', []))
            );
    }

    private isSuccessStatusCode(statusCode) {
        return (statusCode >= 200 && statusCode < 300);
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