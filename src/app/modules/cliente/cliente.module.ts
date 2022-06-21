import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiClienteComponent } from './confi-cliente/confi-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { ClienteComponent } from './cliente.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path:'',
    component:ClienteComponent,
    children:[
      {path:'confi-cliente',component:ConfiClienteComponent}
    ]
  }
]

@NgModule({
  declarations: [
    ClienteComponent,
    ConfiClienteComponent
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class ClienteModule { }
