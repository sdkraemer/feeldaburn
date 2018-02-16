import { Component } from '@angular/core';
import { AuthNewService } from './auth/auth-new.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public auth: AuthNewService
  ){
  }

  ngOnInit(){ }
}
