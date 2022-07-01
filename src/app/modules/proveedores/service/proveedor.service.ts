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

  constructor(
    private http:HttpClient
  )
  
  {
   }

   listarProveedor(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]> (baseUrl+"listarProveedores");
   }
}
