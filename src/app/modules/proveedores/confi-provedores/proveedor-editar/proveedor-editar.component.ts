import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-proveedor-editar',
  templateUrl: './proveedor-editar.component.html',
  styleUrls: ['./proveedor-editar.component.css']
})
export class ProveedorEditarComponent implements OnInit {
  editarForm: FormGroup
  constructor(private dialogRef: MatDialogRef<ProveedorEditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Proveedor, private formBuilder: FormBuilder,private listarProveedor: ProveedorService,) { }
    
  obj;  
  ngOnInit(): void {
    this.obj=this.data
    console.log(this.obj);
    this.formulario()
    this.disabledCampo()
  
  }
  formulario(){
    this.editarForm = this.formBuilder.group({
      idProveedor:[this.obj.idProveedor, Validators.required],
      nombreEmpresa:[this.obj.nombreEmpresa, Validators.required],
      correo:[this.obj.correo, Validators.required],
      telefono:[this.obj.telefono, Validators.required],
      direccion:[this.obj.direccion, Validators.required]
    })
  }

  disabledCampo(){
    if(true){
      this.editarForm.get('idProveedor').disable()
      this.editarForm.get('nombreEmpresa').disable()
    }
  }
  invalido1: boolean = false

  requerido1: boolean = false
  requerido2: boolean = false
  requerido3: boolean = false
  requerido4: boolean = false

  escribirData(param:string){
    if(param=='nombreEmpresa'){

      if(this.editarForm.get('nombreEmpresa').value.length>=1){
        this.listarProveedor.listarProveedor().subscribe(data =>{
          let prove = data.find(element =>element.nombreEmpresa==this.editarForm.get('nombreEmpresa').value)          
          if(prove!=undefined){
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
    else if(param=='correo'){
      if(this.editarForm.get('correo').value!=''){
        this.requerido2=false

      }else{
        this.requerido2=true
      }

    }
    else if(param=='telefono'){
      if(this.editarForm.get('telefono').value!=''){
        this.requerido3=false

      }else{
        this.requerido3=true
      }

    }
    else if(param=='direccion'){
      if(this.editarForm.get('direccion').value!=''){
        this.requerido4=false

      }else{
        this.requerido4=true
      }

    }

  }
  proveedorEditar : Proveedor
  guardarEditar(){
    if(this.editarForm.invalid){
      this.escribirData('correo')
      this.escribirData('telefono')
      this.escribirData('direccion')

    }else{

    this.proveedorEditar={
      idProveedor:this.obj.idProveedor,
      nombreEmpresa:this.editarForm.get('nombreEmpresa').value,
      correo:this.editarForm.value.correo,
      telefono:this.editarForm.value.telefono,
      direccion:this.editarForm.value.direccion
    };
    
    this.listarProveedor.editarProveedor(this.proveedorEditar).subscribe(data =>{
      if(data['Mensaje']=='Proveedor actualizado correctamente'){
        this.listarProveedor.setMensajeCambio('Proveedor actualizado correctamente')
        this.listarProveedor.listarProveedor().subscribe(data =>{
          this.listarProveedor.settabNumCambio(data)

        });
      }else{
        this.listarProveedor.setMensajeCambio('Mensaje: Proveedor no existe')
      }

  });
  this.cerrar();
    }
    }
  

  cerrar(val = {}) {
    this.dialogRef.close(val);
  }
  onlyNumbers(event): boolean {
    const charChode = event.which ? event.which : event.keyCode;
    if (charChode == '46') {
      return true;
    }
    if (charChode > 31 && (charChode < 48 || charChode > 57)) {
      return false;
    }
    return true;
  }
  get f() {
    return this.editarForm.controls;
  }
}
