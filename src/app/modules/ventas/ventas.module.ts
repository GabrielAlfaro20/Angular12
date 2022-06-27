import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';
import { VentasMantenimientosComponent } from './ventas-mantenimientos/ventas-mantenimientos.component';
import { VentasEditarComponent } from './ventas-mantenimientos/ventas-editar/ventas-editar.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component:VentasComponent,
    children:[
      {
        path:'ventas-mantenimientos',component:VentasMantenimientosComponent
      },
    ]
  },
  ]

@NgModule({
  declarations: [VentasComponent, VentasMantenimientosComponent,VentasEditarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  exports: [RouterModule],
})
export class VentasModule { }
