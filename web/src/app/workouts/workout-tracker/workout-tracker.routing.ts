import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';


import { WorkoutTrackerComponent } from './workout-tracker.component';

const routes: Routes = [
  { path: 'workout-tracker', component: WorkoutTrackerComponent, canActivate: [AuthGuard] },
  { path: 'workout-tracker/:id', component: WorkoutTrackerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutTrackerRoutingModule { }

export const routedComponents = [ WorkoutTrackerComponent];  