import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-modal-eliminar-empleado',
  templateUrl: './modal-eliminar-empleado.component.html',
  styleUrls: ['./modal-eliminar-empleado.component.css']
})
export class ModalEliminarEmpleadoComponent implements OnInit {
  flagTab:number;
  flagString:string;
  mensajeEliminado:string;
  constructor(private dialogRef: MatDialogRef<ModalEliminarEmpleadoComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private serviceEmpleado: EmpleadoService) { }
  eliminarEmpleado:any;
  ngOnInit(): void {
    this.eliminarEmpleado={...this.data}
    
    
  }
  cerrar(){
    this.dialogRef.close();
  }
  operar(){
    this.serviceEmpleado.eliminarEmpleado(this.eliminarEmpleado.idEmpleado).pipe(switchMap(()=>{
      return this.serviceEmpleado.listEmpleados()

    })).subscribe(data =>{
      this.serviceEmpleado.setMensajeCambio("Empleado eliminado correctamente")
      this.serviceEmpleado.settabNumCambio(data)
      this.cerrar();
    })
  }

}
