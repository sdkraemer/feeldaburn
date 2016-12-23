import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { WorkoutService } from './workouts/workout.service';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutListComponent } from './workouts/workout-list.component';
import { WorkoutComponent } from './workouts/workout.component';

import { WorkoutTypeComponent } from './workouts/workout-type.component';

import { GuidesComponent } from './guides/guides.component'
import { GuideListComponent } from './guides/guide-list.component'
import { GuideService } from './guides/guide.service';
import { GuideComponent } from './guides/guide.component'


import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    WorkoutsComponent,
    WorkoutListComponent,
    WorkoutComponent,

    WorkoutTypeComponent,

    GuidesComponent,
    GuideListComponent,
    GuideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    WorkoutService,
    GuideService,
    AUTH_PROVIDERS,
    Auth,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
