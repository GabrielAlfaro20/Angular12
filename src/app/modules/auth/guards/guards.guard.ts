import { LoginServiceService } from './../service/login-service.service';
import { Login } from './../model/login.modal';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
  constructor(
    private login: LoginServiceService,
    private router: Router,
  ) { }
  canActivate(): boolean {
    if (this.login.getToken() != null) {
        console.log("logeado exitoso");
        return true
    }
    else {
      this.login.clear()
      this.router.navigate(['/auth/login'])
      console.log("error logeate");
      return false
    }

    //tercera comentada
    /*     if(!this.loginService.isAuth()){
          console.log('Token no es valido o ya expiro');
          this.router.navigate(['/auth/login'])
          return false;

        }
        return true; */

  }
}
