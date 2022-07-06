import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';

const baseUrl = environment.HOST + '/cliente/'
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http:HttpClient
  ) { }

  listClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]> (baseUrl+"listarClientes")
  }
}
