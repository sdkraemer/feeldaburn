import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { WorkoutsModule } from './workouts/workouts.module';

import { GuidesComponent } from './guides/guides.component'
import { GuideListComponent } from './guides/guide-list.component'
import { GuideService } from './guides/guide.service';
import { GuideComponent } from './guides/guide.component'


import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    WorkoutsModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,

    GuidesComponent,
    GuideListComponent,
    GuideComponent
  ],
  providers: [
    GuideService,
    AUTH_PROVIDERS,
    Auth,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
