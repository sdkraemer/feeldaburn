import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { WorkoutsComponent } from './workouts.component';
import { WorkoutComponent } from './workout.component';

const routes: Routes = [  
 { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard] },
  { path: 'workouts/:id', component: WorkoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule { }

export const routedComponents = [WorkoutsComponent, WorkoutComponent];  