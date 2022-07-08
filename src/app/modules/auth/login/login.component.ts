import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import { Login } from '../model/login.modal';
import { AuthInterceptorService } from '../interceptores/auth-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { UsuariosList } from '../model/loginList';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  public form!: FormGroup;
  hide = true;
  usuariolist?: UsuariosList[]
  constructor(
    private router: Router,
    private Builder: FormBuilder,
    private login: LoginServiceService,
    private cookieService: CookieService,
    private authInterceptorService: AuthInterceptorService
  ) { }

  ngOnInit(): void {
    this.formulario();
    if(this.login.verificacionLogout()){
      this.router.navigate(['home'])
      console.log("que llega");

    }
  }
  formulario() {
    this.form = this.Builder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required],
      // txtRol: ['A'],
    });
  }

  get f() {
    return this.form.controls;
  }
  validarUsuario: boolean = false
  validarClave: boolean = false
  usuarioNo: boolean = false
  usuario() {
    if (this.form.get('txtUsuario')?.value.length >= 1) {
      this.validarUsuario = false

    }
    else {
      this.validarUsuario = true
      this.usuarioNo = false

    }
  }
  clave() {
    if (this.form.get('txtPassword')?.value.length >= 1) {
      this.validarClave = false

    }
    else {
      this.validarClave = true
      this.usuarioNo = false

    }
  }
  ingresar() {
    let login: Login = {
      correo: this.form.getRawValue().txtUsuario,
      clave: this.form.getRawValue().txtPassword
    }

    this.login.crearToken(login).subscribe(
      (resp: any) => {
 /*      console.log(resp) */
      this.login.setToken(resp.token)
      //  this.cookieService.set('token',data.token.);
      //  this.authInterceptorService.
      this.router.navigate(['/home'])
    })
      /*       localStorage.setItem('token', resp.token)
   /*  this.usuario()
    this.clave()
    this.login.listarUsuarios().subscribe(data => {
      let usuarioExiste = data.find(element => element.correo == this.form.get('txtUsuario')?.value)
      if (usuarioExiste != undefined) {
        if (usuarioExiste.clave == this.form.get('txtPassword')?.value) {
          if (usuarioExiste.roles?.rol == 'ROLE_ADMIN') {
            this.usuarioNo = false

          }
        }
        else {
          this.usuarioNo = true
        }
      }
      else if (usuarioExiste == undefined) {
        if (this.form.get('txtUsuario')?.value == '') {
          this.usuarioNo = false
          this.validarUsuario = true
        }
        else {
          this.usuarioNo = true
          this.validarUsuario = false
        }
        if (this.form.get('txtPassword')?.value == '') {
          this.usuarioNo = false
          this.validarClave = true
        }
        else {
          this.usuarioNo = true
          this.validarClave = false
        }
      }
      else {
        console.log("Super Error");
      }
    }) */
  }
}
