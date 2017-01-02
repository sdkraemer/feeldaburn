import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AUTH_PROVIDERS } from 'angular2-jwt';

import { Auth } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';

import { WorkoutsModule } from './workouts/workouts.module';
import { GuidesModule } from './guides/guides.module';



import { routing, appRoutingProviders } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    WorkoutsModule,
    GuidesModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    AUTH_PROVIDERS,
    Auth,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
