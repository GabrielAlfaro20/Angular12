import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ProveedoresComponent } from './proveedores.component';
import { ConfiProvedoresComponent } from './confi-provedores/confi-provedores.component';
import { ModalEliminarProveedorComponent } from './confi-provedores/modal-eliminar-proveedor/modal-eliminar-proveedor.component';
import { ProveedorEditarComponent } from './confi-provedores/proveedor-editar/proveedor-editar.component';

const routes: Routes = [
  {
    path: '',
    component:ProveedoresComponent,
    children:[
      {path:'confi-provedores',component:ConfiProvedoresComponent}
    ]
  }
  ]

@NgModule({
  declarations: [ProveedoresComponent, ConfiProvedoresComponent, ModalEliminarProveedorComponent, ProveedorEditarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule],

})
export class ProveedoresModule { }
