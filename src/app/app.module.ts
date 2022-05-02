import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductosComponent } from './modules/pages/productos/productos.component';
import { ConfiUsuarioComponent } from './modules/pages/confi-usuario/confi-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ConfiUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,//material
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
