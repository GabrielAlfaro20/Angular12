import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//los menus del drawer
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path:'producto',
        loadChildren:() =>
        import('../modules/producto/producto.module').then((m) => m.ProductoModule),
      },
      {
        path:'ventas',
        loadChildren:() =>
        import('../modules/ventas/ventas.module').then((m) => m.VentasModule),
      },
      {
        path:'compras',
        loadChildren:() =>
        import('../modules/compras/compras.module').then((m) => m.ComprasModule),
      },
      {
        path:'empleado',
        loadChildren:() =>
        import('../modules/empleado/empleado.module').then((m) => m.EmpleadoModule),
      },
      {
        path:'cliente',
        loadChildren:() =>
        import('../modules/cliente/cliente.module').then((m) => m.ClienteModule),
      },
      {
        path:'proveedores',
        loadChildren:() =>
        import('../modules/proveedores/proveedores.module').then((m) => m.ProveedoresModule),
      },
      {
        path:'reportes',
        loadChildren:() =>
        import('../modules/reportes/reportes.module').then((m) => m.ReportesModule),
      },
    ]
  },
];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class PagesRoutingModule { }
