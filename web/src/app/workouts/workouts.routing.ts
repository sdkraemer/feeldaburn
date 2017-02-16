import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { WorkoutsComponent } from './workouts.component';
import { WorkoutComponent } from './workout.component';

const workoutRoutes: Routes = [  
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuard] },
  { path: 'workouts/:id', component: WorkoutComponent, canActivate: [AuthGuard] }
];

// const workoutRoutes: Routes = [
//   {
//     path: 'workouts',
//     component: WorkoutsComponent,
//     children: [
//       {
//         //TODO: https://angular.io/docs/ts/latest/guide/router.html @ "Here's the complete crisis-center-routing.module.ts file with its imports.src/app/crisis-center/crisis-center-routing.module.ts (excerpt)"
//       }
//     ]
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(workoutRoutes)],
  exports: [RouterModule]
})
export class WorkoutsRoutingModule { }

export const routedComponents = [WorkoutsComponent, WorkoutComponent];  