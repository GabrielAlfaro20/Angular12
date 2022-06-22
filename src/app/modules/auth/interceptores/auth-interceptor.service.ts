import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private cookieService: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // throw new Error('Method not implemented.');
    const token =localStorage.getItem('token');
    // let request = req;
    if (!token) {
      return next.handle(req);
    }
const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(headers).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          // this.router.navigateByUrl('/login');
          console.log('login');

        }

        return throwError(err);

      })
    );
  }

  // herrorHandler(error:HttpErrorResponse):Observable<never>{
  //   if(error instanceof HttpErrorResponse){
  //     if(error.error instanceof ErrorEvent){
  //       console.log('ERROR DE CLIENTE');
  //     }
  //   }
  // }
}
