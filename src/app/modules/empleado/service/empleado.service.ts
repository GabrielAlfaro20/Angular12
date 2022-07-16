import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../model/empleadoModel';

const baseUrl = environment.HOST + '/empleado/'
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private mensajeCambio = new Subject<string>();
  private tabNumCambio = new Subject<Empleado[]>();

  constructor(
    private http:HttpClient
  ) { }
  listEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]> (baseUrl+"listarEmpleados")

  }
  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  
  settabNumCambio(lista: Empleado[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }
  eliminarEmpleado(parametro:string){
    return this.http.delete(baseUrl+"eliminarProveedor/"+parametro);
  }
  registrarEmpleado(parametro: Empleado):Observable<Empleado[]>{
    return this.http.post<Empleado[]>(baseUrl+"registrarEmpleados",parametro);
  }
}
