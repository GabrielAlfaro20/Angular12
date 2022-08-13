import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from '../../model/empleadoModel';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-empleado-editar',
  templateUrl: './empleado-editar.component.html',
  styleUrls: ['./empleado-editar.component.css']
})
export class EmpleadoEditarComponent implements OnInit {
  visible: boolean = true;
  changetype: boolean = true;
  editarForm: FormGroup
  constructor(private dialogRef: MatDialogRef<EmpleadoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Empleado, private formBuilder: FormBuilder,private listarEmpleado: EmpleadoService,) { }

  obj;  
  ngOnInit(): void {
    this.obj=this.data
    console.log(this.obj);
    this.formulario()
    this.disabledCampo()
  }
  formulario(){
    this.editarForm = this.formBuilder.group({
      idEmpleado:[this.obj.idEmpleado, Validators.required],
      nombresEml:[this.obj.nombresEml, Validators.required],
      apellidosEmpl:[this.obj.apellidosEmpl, Validators.required],
      dniEml:[this.obj.dniEml, Validators.required],
      correoEmpl:[this.obj.correoEmpl, Validators.required],
      passwordEmpl:[this.obj.passwordEmpl, Validators.required],
      rolEmpl:[this.obj.rolEmpl, Validators.required],
      estadoEmpl:[this.obj.estadoEmpl==1?true:false, Validators.required]
    })
  }
  verPassword(){
    this.visible =!this.visible
    this.changetype = !this.changetype
  }
  disabledCampo(){
    if(true){
      this.editarForm.get('idEmpleado').disable()
      this.editarForm.get('dniEml').disable()
      this.editarForm.get('nombresEml').disable()
      this.editarForm.get('apellidosEmpl').disable()
    }
  }
  invalido1: boolean = false

  requerido1: boolean = false
  requerido2: boolean = false
  requerido3: boolean = false
  requerido4: boolean = false
  requerido5: boolean = false
  requerido6: boolean = false
  requerido7: boolean = false

  escribirData(param:string){
    if(param=='dniEml'){
      if(this.editarForm.get('dniEml').value.length>=1){
        this.listarEmpleado.listEmpleados().subscribe(data =>{
          let empl = data.find(element =>element.dniEml==this.editarForm.get('dniEml').value)
          if(empl!=undefined){
            this.invalido1=true
            this.requerido1=false
            console.log("existe");
          }else{
            console.log("no existe");
            this.requerido1=false
            this.invalido1=false
          }
        })
        this.requerido1=false
      }else{
        this.requerido1=true
      }
    }
    else if(param=='nombresEml'){
      if(this.editarForm.get('nombresEml').value!=''){
        this.requerido2=false
      }else{
        this.requerido2=true
      }
    }
    else if(param=='apellidosEmpl'){
      if(this.editarForm.get('apellidosEmpl').value!=''){
        this.requerido3=false
      }else{
        this.requerido3=true
      }
    }
    else if(param=='correoEmpl'){
      if(this.editarForm.get('correoEmpl').value!=''){
        this.requerido4=false
      }else{
        this.requerido4=true
      }
    }
    else if(param=='passwordEmpl'){
      if(this.editarForm.get('passwordEmpl').value!=''){
        this.requerido5=false
      }else{
        this.requerido5=true
      }
    }
    else if(param=='rolEmpl'){
      if(this.editarForm.get('rolEmpl').value!=''){
        this.requerido6=false
      }else{
        this.requerido6=true
      }
    }
    else if(param=='passwordEmpl'){
      if(this.editarForm.get('passwordEmpl').value!=''){
        this.requerido7=false
      }else{
        this.requerido7=true
      }
    }

  }

  empleadoEditar : Empleado
  guardarEditar(){
    if(this.editarForm.invalid){
      this.escribirData('nombresEml')
      this.escribirData('apellidosEmpl')
      this.escribirData('dniEml')
      this.escribirData('correoEmpl')
      this.escribirData('rolEmpl')
      this.escribirData('passwordEmpl')
    }else{
      this.empleadoEditar={
        idEmpleado:this.obj.idEmpleado,
        dniEml:this.editarForm.get('dniEml').value,
        nombresEml:this.editarForm.get('nombresEml').value,
        apellidosEmpl:this.editarForm.get('apellidosEmpl').value,
        correoEmpl:this.editarForm.value.correoEmpl,
        rolEmpl:this.editarForm.value.rolEmpl,
        passwordEmpl:this.editarForm.value.passwordEmpl,
        estadoEmpl:this.editarForm.value.estadoEmpl==true?'1':'0'
      };
      this.listarEmpleado.editarEmpleado(this.empleadoEditar).subscribe(data=>{
        if(data['Mensaje']=='Empleado actualizado correctamente'){
          this.listarEmpleado.setMensajeCambio('Empleado actualizado correctamente')
          this.listarEmpleado.listEmpleados().subscribe(data =>{
            this.listarEmpleado.settabNumCambio(data)
          });
        }else{
          this.listarEmpleado.setMensajeCambio('Mensaje: Empleado no existe')
        }
      });
      this.cerrar();
    }
  }


  cerrar(val = {}) {
    this.dialogRef.close(val);
  }
  get f() {
    return this.editarForm.controls;
  }

}
