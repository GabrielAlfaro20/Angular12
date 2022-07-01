import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-modal-eliminar-categoria',
  templateUrl: './modal-eliminar-categoria.component.html',
  styleUrls: ['./modal-eliminar-categoria.component.css']
})
export class ModalEliminarCategoriaComponent implements OnInit {
  datosNuevos!: Categoria;
  flagTab!:number;
  flagString!:string;
  mensajeEliminado!:string;

  constructor(private dialogRef: MatDialogRef<ModalEliminarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Categoria,
    private serviceCategorias: CategoriaService) { }

  ngOnInit(): void {

    switch (this.flagTab) {
      case 0:
        this.flagString = "SUB";
        this.mensajeEliminado = "Se elimino el categoria";
        break;
        default:
        break;
    }
  }


}
