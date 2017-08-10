import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth/auth.service';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(public auth: Auth) { }

    ngOnInit() { }
}