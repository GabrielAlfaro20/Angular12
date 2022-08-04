import { GuardsGuard } from './modules/auth/guards/guards.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesGuardsGuard } from './modules/auth/guards/roles-guards.guard';
/* import { LoginGuard } from './modules/auth/service/login.guard';
 */
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [GuardsGuard,RolesGuardsGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    },
    // canActivate: [RolesGuardsGuard],
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
