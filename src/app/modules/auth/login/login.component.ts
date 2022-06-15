import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import { Login } from '../model/login.modal';
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
    private login: LoginServiceService
  ) {}

  ngOnInit(): void {
    this.formulario();
    this.ingresar();
  }
  formulario() {
    this.from = this.Builder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required],
      txtRol: ['A'],
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
    this.login.crearToken(login).subscribe(data => {
       console.log(data)
    })
    console.log(login)

  }

}
