import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ConfiEmpleadoComponent } from './confi-empleado/confi-empleado.component';

const routes: Routes = [
  {
    path: '',
    component:EmpleadoComponent,
    children:[
      {path: 'confi-empleado', component:ConfiEmpleadoComponent},
    ],
  },
];

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
    EmpleadoComponent,
    ConfiEmpleadoComponent
  ]

})
export class EmpleadoModule { }
