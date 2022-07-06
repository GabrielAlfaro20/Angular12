import { LoginServiceService } from './../service/login-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import decode  from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RolesGuardsGuard implements CanActivate {
  constructor(private loginServiceService:LoginServiceService,
    public router:Router,
    ){

  }
  canActivate(route :ActivatedRouteSnapshot):boolean {
    const expectedRole = route.data.expectedRole;
    console.log(expectedRole);

    const token:any = localStorage.getItem('token')

    const idrol=decode(token);
    console.log(idrol);

    // console.log(decode(token));
    // if(!this.loginServiceService.isAuth()|| idrol !== expectedRole){
    //   console.log("Usuario no Autorizado");
    //   this.router.navigate(['/auth/login'])
    //   return false;
    // }

    return true;
  }

}
