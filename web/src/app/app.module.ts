import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';

import { WorkoutsModule } from './workouts/workouts.module';
import { GuidesModule } from './guides/guides.module';
import { HomeModule } from './home/home.module';
import { MeasurementsModule } from './measurements/measurements.module';

import { routing, appRoutingProviders } from './app.routes';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Auth } from './auth/auth.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig(), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    routing,
    WorkoutsModule,
    GuidesModule,
    HomeModule,
    MeasurementsModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    Auth,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
