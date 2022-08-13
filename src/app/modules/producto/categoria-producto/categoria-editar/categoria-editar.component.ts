import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empleado } from 'src/app/modules/empleado/model/empleadoModel';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {
  editarForm: FormGroup
  constructor(private dialogRef: MatDialogRef<CategoriaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Categoria, private formBuilder: FormBuilder,private listarCategoria: CategoriaService,) { }
    obj;
  ngOnInit(): void {
    this.obj=this.data
    console.log(this.obj);
    this.formulario();
    this.disabledCampo();
  }
  cerrar(val = {}) {
    this.dialogRef.close(val);
    this.formulario();
  }
  
  formulario(){
    this.editarForm = this.formBuilder.group({
      idcategorias:[this.obj.idcategorias, Validators.required],
      nombreCate:[this.obj.nombreCate, Validators.required]
    })
  }
  disabledCampo(){
    if(true){
      this.editarForm.get('idcategorias').disable()
    }
  }

  invalido1: boolean = false

  requerido1: boolean = false
  requerido2: boolean = false


  invalido: boolean = false
  escribirData(param:string){
    if(param=='nombreCate'){
      if(this.editarForm.get('nombreCate').value!=''){
        this.requerido1=false
      }else{
        this.requerido1=true
      }
    }

  }
  get f() {
    return this.editarForm.controls;
  }

  categoriaEditar: Categoria
  guardarEditar(){
    if(this.editarForm.invalid){
      this.escribirData('nombreCate')
    }else{
      this.categoriaEditar={
        idcategorias:this.obj.idcategorias,
        nombreCate:this.editarForm.value.nombreCate
      };
      this.listarCategoria.editarCategoria(this.categoriaEditar).subscribe(data=>{
        if(data['Mensaje']=='Categoria actualizado correctamente'){
          this.listarCategoria.setMensajeCambio('Categoria actualizado correctamente')
          this.listarCategoria.listarCategoria().subscribe(data =>{
            this.listarCategoria.settabNumCambio(data)
          });
        }else{
          this.listarCategoria.setMensajeCambio('Mensaje: Empleado no existe')
        }
      });
      this.cerrar();
    }
  }
}
