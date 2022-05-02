import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { ConfiUsuarioComponent } from '../../pages/confi-usuario/confi-usuario.component';
const routes: Routes = [
  {
    path: 'nav', component: LayoutComponent,
    children:[
      {
        path:'usuario',component:ConfiUsuarioComponent
      }
    ]
  },
];
@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class LayoutRouterModule { }
