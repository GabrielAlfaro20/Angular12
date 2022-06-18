import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  {
    path: '',
    component:VentasComponent,

  }
  ]

@NgModule({
  declarations: [VentasComponent],
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
