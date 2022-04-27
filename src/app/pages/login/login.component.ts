import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  hide = true;

  constructor(
  ) { }

  ngOnInit(): void {
    this.formulario();
    console.log(this.form.get('txtusuario')?.value);
    
  }
  formulario() {
    this.form = new FormGroup({
      txtusuario: new FormControl(''),
      rol : new FormControl('A')
        })
  }
}
