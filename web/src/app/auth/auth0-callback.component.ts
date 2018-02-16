import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthNewService } from './auth-new.service';

@Component({
    selector: 'auth0-callback',
    templateUrl: 'auth0-callback.component.html'
})

export class Auth0CallbackComponent implements OnInit {
    loggedInSub: Subscription;

    constructor(
        private auth: AuthNewService,
        private router: Router) {
        auth.handleAuth();
    }

    ngOnInit() {
        this.loggedInSub = this.auth.loggedIn$.subscribe(
            loggedIn => loggedIn ? this.router.navigate(['/']) : null
        )
    }

    ngOnDestroy() {
        this.loggedInSub.unsubscribe();
    }
}