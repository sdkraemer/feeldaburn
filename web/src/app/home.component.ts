import { Component, OnInit } from '@angular/core';
import { Auth } from './auth/auth.service';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['./calendar.css']
})
export class HomeComponent implements OnInit {
    viewDate: Date = new Date();
    events = [];

    constructor(private auth: Auth) { }

    ngOnInit() { }

}