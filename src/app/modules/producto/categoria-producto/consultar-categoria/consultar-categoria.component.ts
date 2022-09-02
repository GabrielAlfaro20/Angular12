import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../../model/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-consultar-categoria',
  templateUrl: './consultar-categoria.component.html',
  styleUrls: ['./consultar-categoria.component.css']
})
export class ConsultarCategoriaComponent implements OnInit {
  consultarForm: FormGroup
  constructor(private dialogRef: MatDialogRef<ConsultarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Categoria, private formBuilder: FormBuilder,private listarCategoria: CategoriaService,) { }
    obj;
  ngOnInit(): void {
    this.obj=this.data
    console.log(this.obj);
    this.formulario()
    this.disabledCampo()
  }
  cerrar(val = {}) {
    this.dialogRef.close(val);
    this.formulario();
  }
  formulario(){
    this.consultarForm = this.formBuilder.group({
      idcategorias:[this.obj.idcategorias, Validators.required],
      nombreCate:[this.obj.nombreCate, Validators.required]
    })
  }
  disabledCampo(){
    if(true){
      this.consultarForm.get('idcategorias').disable()
      this.consultarForm.get('nombreCate').disable()
    }
  }

}
