import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;

  constructor(private router: Router) { }
  logIn(): void {
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
    this.router.navigate(['/layout/nav']);
  }
}
