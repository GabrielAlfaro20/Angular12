import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CategoriaProductoComponent } from './categoria-producto/categoria-producto.component';
import { MantenimientoProductoComponent } from './mantenimiento-producto/mantenimiento-producto.component';
import { ModalEliminarCategoriaComponent } from './modal-eliminar-categoria/modal-eliminar-categoria.component';
import { CategoriaEditarComponent } from './categoria-producto/categoria-editar/categoria-editar.component';
import { ProductoEditarComponent } from './mantenimiento-producto/producto-editar/producto-editar.component';
import { ModalEliminarProductoComponent } from './mantenimiento-producto/modal-eliminar-producto/modal-eliminar-producto.component';
import { ConsultarCategoriaComponent } from './categoria-producto/consultar-categoria/consultar-categoria.component';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    children: [
      { path: 'categoria-producto', component: CategoriaProductoComponent },
      { path: 'mantenimiento-producto', component: MantenimientoProductoComponent },

    ]

  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule],
  declarations: [
    ProductoComponent,
    CategoriaProductoComponent,
    MantenimientoProductoComponent,
    ModalEliminarCategoriaComponent,
    CategoriaEditarComponent,
    ProductoEditarComponent,
    ModalEliminarProductoComponent,
    ConsultarCategoriaComponent,],
})
export class ProductoModule { }
