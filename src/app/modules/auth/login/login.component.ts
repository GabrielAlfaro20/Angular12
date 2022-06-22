import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import { Login } from '../model/login.modal';
import { AuthInterceptorService } from '../interceptores/auth-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public from!: FormGroup;
  hide = true;


  constructor(
    private router: Router,
    private Builder: FormBuilder,
    private login: LoginServiceService,
    private cookieService: CookieService,
    private authInterceptorService:AuthInterceptorService
  ) {}

  ngOnInit(): void {
    this.formulario();
    // this.ingresar();
  }
  formulario() {
    this.from = this.Builder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required],
      // txtRol: ['A'],
    });
  }

  get f() {
    return this.from.controls;
  }
  ingresar() {
    let login: Login ={
      correo : this.from.getRawValue().txtUsuario,
      clave : this.from.getRawValue().txtPassword
    }
    console.log(this.from.value);

    this.login.crearToken(login).subscribe((resp:any) => {
       console.log(resp)
      //  this.cookieService.set('token',data.token.);
      //  this.authInterceptorService.
       localStorage.setItem('token',resp.token)
       this.router.navigate(['/home'])

    })
    // console.log("este "+login)

  }

}
