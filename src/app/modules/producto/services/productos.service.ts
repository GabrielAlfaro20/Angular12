import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto';

const baseUrl = environment.HOST + '/producto/'
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private mensajeCambio = new Subject<string>();
  private tabNumCambio = new Subject<Producto[]>();

  constructor(
    private http:HttpClient
  ) {}

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }


  settabNumCambio(lista: Producto[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }

  listarProducto(): Observable<Producto[]> {
    return this.http.get<Producto[]> (baseUrl+"listProducts");
   }

   eliminarProducto(parametro:string){
    return this.http.delete(baseUrl+"eliminarProducto/"+parametro);
  }
  guardarProducto(parametro:Producto){
    return this.http.post<Producto>(baseUrl+"agregarProducto/",parametro);
  }


}
