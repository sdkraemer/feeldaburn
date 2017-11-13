import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AuthGuard }                from './auth/auth.guard';

const appRoutes: Routes = [
    { path: '**', redirectTo: '' }
  ];
  
  export const appRoutingProviders: any[] = [
      AuthGuard
  ];

// const appRoutes: Routes = [
//   { path: 'crisis-center', component: CrisisListComponent },
//   { path: 'heroes',        component: HeroListComponent },
//   { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
// ];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}