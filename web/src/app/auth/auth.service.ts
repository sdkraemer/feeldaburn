// import { Injectable } from '@angular/core';
// import { tokenNotExpired, AuthHttp } from 'angular2-jwt';
// import { Router } from '@angular/router';
// import { environment } from '../../environments/environment';
// import 'rxjs/add/operator/map';

// // Avoid name not found warnings
// declare var Auth0Lock: any;

// @Injectable()
// export class Auth {
//   // Configure Auth0
//   lock = new Auth0Lock('TSWTGq6o5dDKUYt1qxvSGWOjikQZ38VX', 'feeldaburn.auth0.com', {});
//   userProfile: any;
//   apiUrl: string = `${environment.apiUrl}/users`;

//   // if (!navigator.onLine) {

//   constructor(
//     private router: Router,
//     private authHttp: AuthHttp
//   ) {
//     this.userProfile = JSON.parse(localStorage.getItem('profile'));

//     this.lock.on('authenticated', (authResult) => {
//       localStorage.setItem('id_token', authResult.idToken);
//       this.lock.getProfile(authResult.idToken, (error, profile) => {
//         if (error) {
//           console.log("Error logging in: " + error);
//           return;
//         }
//         localStorage.setItem('profile', JSON.stringify(profile));
//         this.userProfile = profile;

//         this.createUser(profile);

//         var redirectUrl: string = localStorage.getItem('redirect_url');
//         if (redirectUrl != undefined) {
//           this.router.navigate([redirectUrl]);
//           localStorage.removeItem('redirect_url');
//         } else {
//           this.router.navigate(['/']);
//         }
//       });
//     });
//   }

//   //probably belongs in some sort of user service, but just try this
//   private createUser(profileJson) {
//     console.log("creating user");
//     this.authHttp.post(this.apiUrl, profileJson)
//       .map(res => res.json())
//       .subscribe(user => {
//         console.log("did it create a user?");
//         console.log(user);
//       });
//   }

//   public login() {
//     // Call the show method to display the widget.
//     this.lock.show();
//   }

//   public authenticated() {
//     // Check if there's an unexpired JWT
//     // This searches for an item in localStorage with key == 'id_token'
//     return tokenNotExpired();
//   }

//   public logout() {
//     // Remove token from localStorage
//     localStorage.removeItem('id_token');
//     localStorage.removeItem('profile');
//     this.userProfile = undefined;
//     this.router.navigate(['']);
//   }
// }