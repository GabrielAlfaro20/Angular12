import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public from!: FormGroup;
  hide = true;
  vacio: Boolean = false;

  invalidLogin = false
  usuario = ""
  password = ""
  rol = ""

  constructor(private router: Router,
    private Builder: FormBuilder,
    private loginService: LoginService

  ) { }

  ngOnInit(): void {
    this.formulario();
    this.usuario = this.from.get("txtUsuario")?.value
    this.password = this.from.get("txtPassword")?.value
    this.rol = this.from.get("txtRol")?.value

  }
  formulario() {
    this.from = this.Builder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required],
      txtRol: ['A'],
    })
  }
  FromVis() {
    console.log(this.from.value);

  }
/*   signIn() {
    console.log("entra");
    if (this.loginService.autenticar(this.usuario, this.password, this.rol)
    ) {
      console.log("incorrecto");
      this.router.navigate(['/auth/login']);
      this.invalidLogin = false
    } else
      console.log("correcto");
    this.invalidLogin = true
  } */
  get f() {
    return this.from.controls;
  }

  /* signIn(): void {
     console.log(this.from.value)
     if (this.from.get("txtUsuario")?.value == 'kirby' && this.from.get("txtPassword")?.value == '123' && this.from.get("txtRol")?.value == 'A') {
       this.loginService.logIn();
       console.log("entre");
 
     } else {
       this.vacio == true;
       console.log(this.vacio);
 
       if (this.from.invalid && this.from.value == undefined) {
         this.loginService.logOut();
         console.log(this.vacio);
         console.log("contraseña incorrecta");
       }
     }
   }*/
}
