import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './modules/auth/auth.component';
import { ProveedoresComponent } from './modules/proveedores/proveedores.component';
import { ReportesComponent } from './modules/reportes/reportes.component';
import { VentasComponent } from './modules/ventas/ventas.component';
import { ComprasComponent } from './modules/compras/compras.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthInterceptorService } from './modules/auth/interceptores/auth-interceptor.service';
import { ProductoComponent } from './modules/producto/producto.component';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    },
    {provide:JWT_OPTIONS, useValue:JWT_OPTIONS},// trabaja de la mano con JwtHelperService
    JwtHelperService // permite decodificar y verificar los token desde el lado del servidor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }