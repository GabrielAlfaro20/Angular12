import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  id_producto?:string;
  producto?:string;
  cantidad?:string;
  precio_Unitario?:string;
  precio_subTotal?:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {id_producto: '1', producto: 'cuaderno', cantidad: '1.0079', precio_Unitario: 'H',precio_subTotal:'2021-01-01'},
  {id_producto: '2', producto: 'xd', cantidad: '1.0079', precio_Unitario: '1.00',precio_subTotal:'100'},
  {id_producto: '3', producto: 'xd', cantidad: '1.0079', precio_Unitario: '1.00',precio_subTotal:'100'},
  {id_producto: '4', producto: 'xd', cantidad: '1.0079', precio_Unitario: '1.00',precio_subTotal:'100'},
  {id_producto: '5', producto: 'xd', cantidad: '1.0079', precio_Unitario: '1.00',precio_subTotal:'100'},
];
@Component({
  selector: 'app-ventas-editar',
  templateUrl: './ventas-editar.component.html',
  styleUrls: ['./ventas-editar.component.css']
})
export class VentasEditarComponent implements OnInit {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  displayedColumns: string[] = ['id_producto', 'producto', 'cantidad', 'precio_Unitario','precio_subTotal'];
  dataSource = ELEMENT_DATA;
  constructor(
    private dialogRef: MatDialogRef<VentasEditarComponent>,

  ) { }

  ngOnInit(): void {
  }
  cerrar(val = {}) {
    this.dialogRef.close(val);
  }
}
