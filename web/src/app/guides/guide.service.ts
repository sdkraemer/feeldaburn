import { Injectable } from '@angular/core';
import { Guide, IGuide } from '../core';
import { Http, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';

//rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';


@Injectable()
export class GuideService {
    apiUrl: string = `${environment.apiUrl}/guides`;

    constructor(
        private http: Http,
        private authHttp: AuthHttp
    ) { }

    getGuides(): Observable<IGuide[]> {
        return this.authHttp.get(this.apiUrl)
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.handleError);
    }

    getGuide(_id: string): Observable<IGuide> {
        const url = `${this.apiUrl}/${_id}`;
        return this.authHttp
                    .get(url)
                    .map((response: Response) => {
                        return response.json();
                    })
                    .catch(this.handleError); 
    }

    add(guide: IGuide): Observable<boolean> {
        return this.authHttp.post(this.apiUrl, guide)
                   .map((response: Response) => {
                        return this.isSuccessStatusCode(response.status);
                   })
                   .catch(this.handleError);
    }

    update(guide: IGuide): Observable<boolean> {
        return this.authHttp.put(`${this.apiUrl}/${guide._id}`, guide)
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

    private isSuccessStatusCode(statusCode) {
        return (statusCode >= 200 && statusCode < 300);
    }

    handleError(error: any){
        console.error('server error:', error);
        return Observable.throw(error || ' default error handlererererer');
    }
}