import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login} from '../model/login.modal'
import { UsuariosList } from '../model/loginList';
import { Router } from '@angular/router';

const baseUrl = environment.HOST + '/usuarios/';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient,
      private router : Router,
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
  public setToken(token:string){
    localStorage.setItem("token",token)
  }
  public getToken():string{
    return localStorage.getItem('token')
  }

  public verificacionLogout():boolean{
    const token= localStorage.getItem("token");
    return !!token;
  }
  public clear():void{
    localStorage.removeItem('token')
  }
  public islogout(){
    this.getToken()
  }
  //una comentada
/*   isAuth():boolean{
    const token:any = localStorage.getItem('token');
    if(this.jwtHelperService.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  } */
}

