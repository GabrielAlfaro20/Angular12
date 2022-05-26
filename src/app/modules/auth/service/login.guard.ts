import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router){}
    canActivate():boolean | UrlTree {
      return this.isUserLoggedIn();
  }
  private isUserLoggedIn(): boolean | UrlTree {
    
    return this.loginService.loggedIn || this.router.parseUrl('/auth/login');
  }
  
}
