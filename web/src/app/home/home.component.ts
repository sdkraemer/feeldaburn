import { Component, OnInit } from '@angular/core';
import { AuthNewService } from '../auth/auth-new.service';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(public auth: AuthNewService) { }

    ngOnInit() { }
}