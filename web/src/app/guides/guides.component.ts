import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'guides',
    templateUrl: 'guides.component.html',
    styles: [`
        h1 {
            font-family: 'Aeromatics';
        }
    `]
})
export class GuidesComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}