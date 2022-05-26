import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;

  constructor(private router: Router) { }
  /*     logIn(): void {
       this.loggedIn = true;
       this.redirectToLayout();
     }
     logOut(): void {
       this.loggedIn = false;
       this.redirectToLogin();
     }
     private redirectToLogin(): void {
       this.router.navigate(['/auth/login']);
     }
     private redirectToLayout(): void {
       this.router.navigate(['/home']);
     }  */

  //Autenticar el nombre de usuario,contraseña y el rol
  autenticar(username: string, password: string, rol: string) {
    if (username === "kirby" && password === "123" && rol === "A") {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }
  //comprueba el almacenamiento de la sesión si existe un nombre de usuario. Si lo hace, devuelve true
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }
  // Este método borra el almacenamiento de sesión del nombre de usuario
  logOut() {
    sessionStorage.removeItem('username')
  }
}
