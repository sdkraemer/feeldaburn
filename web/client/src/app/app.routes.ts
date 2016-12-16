import { ModuleWithProviders }         from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';

import { HomeComponent }               from './home.component';
import { WorkoutsComponent }         from './workouts/workouts.component';
import { WorkoutComponent }         from './workouts/workout.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'workouts/:id', component: WorkoutComponent },
  { path: '**', redirectTo: '' }
];

// export const appRoutingProviders: any[] = [
//     AuthGuard
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);