import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styles: [`
        .logo {
            font-family: 'Aeromatics';
        }
    `]
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}