import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { LoginService } from '../../configuracion/module/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public from!: FormGroup;
  hide = true;
  incorrecto = true;

  constructor(private router: Router,
    private Builder: FormBuilder,
    private loginSerive: LoginService
  ) { }

  ngOnInit(): void {
    this.formulario();
  }
  get f() {
    return this.from.controls;
  }

  formulario() {
    this.from = this.Builder.group({
      txtusuario: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['A'],

    })
  }
  signIn(): void {
    console.log(this.from.value)
    if (this.from.get("txtusuario")?.value == 'kirby' && this.from.get("password")?.value == '123' && this.from.get("rol")?.value == 'V') {
      this.incorrecto == false;
      this.loginSerive.logIn();
      console.log("entre");

    } else {
      this.incorrecto == true;
      console.log(this.incorrecto);

      if (this.from.invalid && this.from.value == undefined) {
        this.loginSerive.logOut();
        console.log(this.incorrecto);
        console.log("contraseña incorrecta");
      }
    }
  }
}
