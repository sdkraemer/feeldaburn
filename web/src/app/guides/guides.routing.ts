import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { GuidesComponent } from './guides.component';
import { GuideComponent } from './guide.component';

const routes: Routes = [  
    { path: 'guides', component: GuidesComponent, canActivate: [AuthGuard] },
    { path: 'guides/:id', component: GuideComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuidesRoutingModule { }

export const routedComponents = [GuidesComponent, GuideComponent];  