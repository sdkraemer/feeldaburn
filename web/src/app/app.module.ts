import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { WorkoutsModule } from './workouts/workouts.module';
import { GuidesModule } from './guides/guides.module';
import { HomeModule } from './home/home.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { Auth0CallbackComponent } from './auth/auth0-callback.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    WorkoutsModule,
    GuidesModule,
    HomeModule,
    MeasurementsModule,
    AppRoutingModule,//This needs to be after all other feature modules.
  ],
  declarations: [
    AppComponent,
    Auth0CallbackComponent
  ],
  providers: [
    AuthService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
