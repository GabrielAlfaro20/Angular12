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
  public form!: FormGroup;
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
    this.form = this.Builder.group({
      txtUsuario: ['', Validators.required],
      txtPassword: ['', Validators.required],
      txtRol: ['A' , Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }
  validar:boolean=false
  vacio:boolean=false
  ingresar(){
  if(this.form.get('txtUsuario')?.value =='kirby' &&
  this.form.get('txtPassword')?.value =='123' &&
  this.form.get('txtRol')?.value =='A'){
    this.router.navigate(['/home']);
  }

 else if(this.form.get('txtUsuario')?.value =='' &&
  this.form.get('txtPassword')?.value ==''){
    this.vacio=true
    this.validar=false
    }
else{
  this.vacio=false
  this.validar=true
}
  }

}
