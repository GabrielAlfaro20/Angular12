import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-modal-eliminar-categoria',
  templateUrl: './modal-eliminar-categoria.component.html',
  styleUrls: ['./modal-eliminar-categoria.component.css']
})
export class ModalEliminarCategoriaComponent implements OnInit {
  
  flagTab!:number;
  flagString!:string;
  mensajeEliminado!:string;

  constructor(private dialogRef: MatDialogRef<ModalEliminarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private serviceCategorias: CategoriaService) { }
  eliminar:any;
  ngOnInit(): void {
    this.eliminar={...this.data['principal']}
    console.log(this.data.nombreCate);
    console.log(this.data.idcategorias);
    
    
    
  }
  cerrar() {
    this.dialogRef.close();
  }
  operar(){
    this.serviceCategorias.eliminarCategoria(this.eliminar.idcategorias).pipe(switchMap(()=>{
      return this.serviceCategorias.listarCategoria()
    })).subscribe(data =>{
      this.serviceCategorias.setMensajeCambio("Categoria eliminado correctamente")
      this.serviceCategorias.settabNumCambio(data)

      
    })

  }


}
