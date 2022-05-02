import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './modules/configuracion/module/login/login.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/configuracion/module/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'layout',
    loadChildren: () =>
      import('./modules/configuracion/module/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [LoginGuard],

  }, { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
