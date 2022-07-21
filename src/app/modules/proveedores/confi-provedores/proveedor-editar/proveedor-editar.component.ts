import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    }
  }
  campo1:boolean=false
  campo2:boolean=false
  campo3:boolean=false
  campo4:boolean=false

  existe1:boolean=false
  existe2:boolean=false
  existe3:boolean=false
  existe4:boolean=false


  escribirData(param:string){
    if(param=='nombreEmpresa'){

      if(this.editarForm.get('nombreEmpresa').value.length>=1){
        this.listarProveedor.listarProveedor().subscribe(data =>{
          let prove = data.find(element =>element.nombreEmpresa==this.editarForm.get('nombreEmpresa').value)          
        
          
          /* if(data[0].nombreEmpresa==prove){
            console.log("son iguales");
            
          }else if(ata[0].nombreEmpresa!=prove){
            console.log();
            
          } */
          if(data[0].nombreEmpresa==prove ){
            console.log(prove.nombreEmpresa);
            
            this.campo1=false
            this.existe1=true
            console.log("existe");
            
          }else{

            this.campo1=false
            this.existe1=false
            console.log("no existe");
            
          } 
        })
  
      }else{
        this.campo1=true
      }

    }
    else if(param=='correo'){
      if(this.editarForm.get('correo').value!=''){
        this.campo2=false

      }else{
        this.campo2=true
      }

    }
    else if(param=='telefono'){
      if(this.editarForm.get('telefono').value!=''){
        this.campo3=false

      }else{
        this.campo3=true
      }

    }
    else if(param=='direccion'){
      if(this.editarForm.get('direccion').value!=''){
        this.campo4=false

      }else{
        this.campo4=true
      }
    }
  }
  proveedorEditar : Proveedor
  guardarEditar(){
    this.proveedorEditar={
      nombreEmpresa:this.editarForm.value.nombreEmpresa,
      correo:this.editarForm.value.correo,
      telefono:this.editarForm.value.telefono,
      direccion:this.editarForm.value.direccion
    };
    console.log(this.proveedorEditar);
    this.listarProveedor.editarProveedor(this.proveedorEditar).subscribe((data)=>{
      if(data['Mensaje']=='Error: El nombre del proveedor ya existe'){
        this.listarProveedor.setMensajeCambio('Ya existe nombre')
      }else if(data['Mensaje']=='Actualizado correctamente'){
        this.listarProveedor.setMensajeCambio('Actualizado correctamente')
        this.listarProveedor.listarProveedor().subscribe((data)=>{
          this.listarProveedor.settabNumCambio(data)

        });
        this.cerrar();
      }
      
    })
    

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
