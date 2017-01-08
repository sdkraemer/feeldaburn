import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';


import { WorkoutPickerComponent } from './workout-picker.component';

const routes: Routes = [
  { path: 'workout-picker', component: WorkoutPickerComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutPickerRoutingModule { }

export const routedComponents = [ WorkoutPickerComponent];  