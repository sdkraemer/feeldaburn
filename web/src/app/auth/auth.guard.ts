import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthNewService } from './auth-new.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthNewService, private router: Router) { }

  canActivate() {
    if (this.auth.authenticated) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}