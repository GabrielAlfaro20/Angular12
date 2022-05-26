import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../model/login.modal'
const baseUrl = environment.HOST + '/usuarios/';
@Injectable({
  providedIn: 'root'
})
export class LoginSService {
  constructor(private http: HttpClient) { }
  listarUsuarios(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(baseUrl + "listarUsuarios/");
  }
  registarUsuario(usuarios: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(baseUrl + "regisrarUsuario/", usuarios)
  }
  updateUsuario(usuarios: Usuarios): Observable<Usuarios[]> {
    return this.http.put<Usuarios[]>(baseUrl + "editarUsuario/", usuarios)
  }
}
