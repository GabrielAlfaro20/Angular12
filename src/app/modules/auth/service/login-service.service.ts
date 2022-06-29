import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login} from '../model/login.modal'
import { UsuariosList } from '../model/loginList';

const baseUrl = environment.HOST + '/usuarios/';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient,
    private jwtHelperService:JwtHelperService) { }
   listarUsuarios(): Observable<UsuariosList[]> {
    return this.http.get<UsuariosList[]>(baseUrl + "listarUsuarios/");
  }
  /*
  registarUsuario(usuarios: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>(baseUrl + "regisrarUsuario/", usuarios)
  }
  updateUsuario(usuarios: Usuarios): Observable<Usuarios[]> {
    return this.http.put<Usuarios[]>(baseUrl + "editarUsuario/", usuarios)
  } */
  crearToken(crear : Login) : Observable<Login[]>{
    return this.http.post<Login[]>(baseUrl+"crearToken",crear);
  }

  isAuth():boolean{
    const token:any = localStorage.getItem('token');
    if(this.jwtHelperService.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
}

