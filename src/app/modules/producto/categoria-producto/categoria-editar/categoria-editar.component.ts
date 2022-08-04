import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
}
