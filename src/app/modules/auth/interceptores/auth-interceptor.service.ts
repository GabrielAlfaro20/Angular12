import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { LoginServiceService } from '../service/login-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService,
    private login: LoginServiceService,
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // comentada 4
    const token = this.login.getToken();
    if (!token) {
      return next.handle(req);
    }
    /*     this.addToken(req, token);*/
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(headers).pipe(
      catchError(
        (err: HttpErrorResponse) => {
          console.log(err.status);
          if (err.status === 401) {
            console.log("holasdsd");

            this.login.clear()
            this.router.navigate(['/auth/login'])
            console.log("401");

            return throwError("Error 401");

          } else if (err.status === 403) {
            console.log("403");
          }
          return throwError("Error vuelve a intentarlo");
        }
      )
    );
    /*     const headers = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(headers).pipe(
              catchError((err: HttpErrorResponse) => {

                if (err.status === 401) {
                  console.log('401');
                }
                else if(err.status === 403){
                  console.log("403");

                }

                return throwError(err.status +' '+ 'que llegara');

              })
            );*/
  }

  /*   private addToken(req: HttpRequest<any>, token: string) {
      const headers = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    } */
}
