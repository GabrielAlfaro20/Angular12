import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-empleado-editar',
  templateUrl: './empleado-editar.component.html',
  styleUrls: ['./empleado-editar.component.css']
})
export class EmpleadoEditarComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EmpleadoEditarComponent>,) { }

  ngOnInit(): void {
  }
  cerrar(val = {}) {
    this.dialogRef.close(val);
  }
  

}
