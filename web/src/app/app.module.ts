import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

// import { AuthHttp, AuthConfig } from 'angular2-jwt';
// import { Auth } from './auth/auth.service';
// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp(new AuthConfig(), http, options);
// }

import { WorkoutsModule } from './workouts/workouts.module';
import { GuidesModule } from './guides/guides.module';
import { HomeModule } from './home/home.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthNewService } from './auth/auth-new.service';
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
    // {
    //   provide: AuthHttp,
    //   useFactory: authHttpServiceFactory,
    //   deps: [Http, RequestOptions]
    // },
    // Auth,
    AuthNewService,
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
