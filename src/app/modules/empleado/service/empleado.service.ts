import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../model/empleadoModel';

const baseUrl = environment.HOST + '/empleado/'
@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http:HttpClient
  ) { }
  listEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]> (baseUrl+"listarEmpleados")

  }
}
