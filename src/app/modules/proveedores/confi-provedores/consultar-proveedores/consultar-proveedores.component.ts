import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-consultar-proveedores',
  templateUrl: './consultar-proveedores.component.html',
  styleUrls: ['./consultar-proveedores.component.css']
})
export class ConsultarProveedoresComponent implements OnInit {
  consultarForm: FormGroup
  constructor(private dialogRef: MatDialogRef<ConsultarProveedoresComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Proveedor, private formBuilder: FormBuilder,private listarProveedor: ProveedorService,) { }
    obj; 
  ngOnInit(): void {
    this.obj=this.data
    console.log(this.obj);
    this.formulario()
    this.disabledCampo()
  }
  formulario(){
    this.consultarForm = this.formBuilder.group({
      idProveedor:[this.obj.idProveedor, Validators.required],
      nombreEmpresa:[this.obj.nombreEmpresa, Validators.required],
      correo:[this.obj.correo, Validators.required],
      telefono:[this.obj.telefono, Validators.required],
      direccion:[this.obj.direccion, Validators.required]
    })
  }
  disabledCampo(){
    if(true){
      this.consultarForm.get('idProveedor').disable()
      this.consultarForm.get('nombreEmpresa').disable()
      this.consultarForm.get('correo').disable()
      this.consultarForm.get('telefono').disable()
      this.consultarForm.get('direccion').disable()
    }
  }

  cerrar(val = {}) {
    this.dialogRef.close(val);
  }

}
