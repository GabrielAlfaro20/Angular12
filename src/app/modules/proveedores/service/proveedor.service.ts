import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from '../model/proveedor';

const baseUrl = environment.HOST + '/proveedor/'
@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private mensajeCambio = new Subject<string>();
  private tabNumCambio = new Subject<Proveedor[]>();

  constructor(
    private http:HttpClient
  )
  
  {
   }

   listarProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]> (baseUrl+"listarProveedores");
   }
   setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  
  settabNumCambio(lista: Proveedor[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }
  eliminarProveedor(parametro:string){
    return this.http.delete(baseUrl+"eliminarEmpleado/"+parametro);
  }
}
