import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

const routes: Routes = [
  {
    path: '',
    component: ProductoComponent,
    children: [
      { path: 'productos', component: ProductosComponent },
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
  providers: [],
  declarations: [ProductoComponent, ProductosComponent],
})
export class ProductoModule { }
