import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from '../../model/empleadoModel';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-consultar-empleado',
  templateUrl: './consultar-empleado.component.html',
  styleUrls: ['./consultar-empleado.component.css']
})
export class ConsultarEmpleadoComponent implements OnInit {
  consultarForm: FormGroup

  constructor(private dialogRef: MatDialogRef<ConsultarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Empleado, private formBuilder: FormBuilder,private listarEmpleado: EmpleadoService,) { }

    obj;
  ngOnInit(): void {
    this.obj=this.data
    console.log(this.obj);
    this.formulario()
    this.disabledCampo()
  }

  formulario(){
    this.consultarForm = this.formBuilder.group({
      idEmpleado:[this.obj.idEmpleado, Validators.required],
      nombresEml:[this.obj.nombresEml, Validators.required],
      apellidosEmpl:[this.obj.apellidosEmpl, Validators.required],
      dniEml:[this.obj.dniEml, Validators.required],
      correoEmpl:[this.obj.correoEmpl, Validators.required],
      passwordEmpl:[this.obj.passwordEmpl, Validators.required],
      rolEmpl:[this.obj.rolEmpl, Validators.required],
      estadoEmpl:[this.obj.estadoEmpl==1?true:false, Validators.required]
    })
    console.log(this.obj.estadoEmpl);
    
  }
  disabledCampo(){
    if(true){
      this.consultarForm.get('idEmpleado').disable()
      this.consultarForm.get('nombresEml').disable()
      this.consultarForm.get('apellidosEmpl').disable()
      this.consultarForm.get('dniEml').disable()
      this.consultarForm.get('correoEmpl').disable()
      this.consultarForm.get('passwordEmpl').disable()
      this.consultarForm.get('rolEmpl').disable()
      this.consultarForm.get('estadoEmpl').disable()

    }
  }
  cerrar(val = {}) {
    this.dialogRef.close(val);
  }

}
