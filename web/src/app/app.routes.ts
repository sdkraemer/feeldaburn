import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { Auth0CallbackComponent } from 'app/auth/auth0-callback.component';

import { AuthGuard }                from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'auth0callback', component: Auth0CallbackComponent },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
    AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);