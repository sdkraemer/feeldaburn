import { ModuleWithProviders }      from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { HomeComponent }            from './home.component';
import { WorkoutsComponent }        from './workouts/workouts.component';
import { WorkoutComponent }         from './workouts/workout.component';

import { AuthGuard }                from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard] },
  { path: 'workouts/:id', component: WorkoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
    AuthGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);