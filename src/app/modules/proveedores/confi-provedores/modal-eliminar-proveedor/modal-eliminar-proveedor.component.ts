import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { ProveedorService } from '../../service/proveedor.service';

@Component({
  selector: 'app-modal-eliminar-proveedor',
  templateUrl: './modal-eliminar-proveedor.component.html',
  styleUrls: ['./modal-eliminar-proveedor.component.css']
})
export class ModalEliminarProveedorComponent implements OnInit {
  flagTab:number;
  flagString:string;
  mensajeEliminado:string;
  constructor(private dialogRef: MatDialogRef<ModalEliminarProveedorComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private serviceProveedor: ProveedorService) { }
    eliminarProveedor:any;
  ngOnInit(): void {
    this.eliminarProveedor={...this.data}
  }
  cerrar(){
    this.dialogRef.close();
  }
  operar(){
    this.serviceProveedor.eliminarProveedor(this.eliminarProveedor.idProveedor).pipe(switchMap(()=>{
      return this.serviceProveedor.listarProveedor()
    })).subscribe(data =>{
      this.serviceProveedor.setMensajeCambio("Proveedor eliminado correctamente")
      this.serviceProveedor.settabNumCambio(data)
      this.cerrar();
    })
  }

}
