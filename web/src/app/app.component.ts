import { Component } from '@angular/core';
import { Auth } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Feel Da Burn';
  selectedWorkout : any;

  constructor(
    private auth: Auth
  ){
  }

  ngOnInit(){ }
}
