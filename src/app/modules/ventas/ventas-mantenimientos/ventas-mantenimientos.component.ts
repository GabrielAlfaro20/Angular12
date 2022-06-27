import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ventasmodel } from '../model/ventas-model';
import { VentasEditarComponent } from './ventas-editar/ventas-editar.component';

export interface PeriodicElement {
  cod_Venta?:string;
  tip_Venta?:string;
  cliente?:string;
  direccion?:string;
  fecha?:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {cod_Venta: '1', tip_Venta: 'Hydrogen', cliente: '1.0079', direccion: 'H',fecha:'2021-01-01'},
  {cod_Venta: '2', tip_Venta: 'Hydrogen', cliente: '1.0079', direccion: 'H',fecha:'2021-01-01'}
];
@Component({
  selector: 'app-ventas-mantenimientos',
  templateUrl: './ventas-mantenimientos.component.html',
  styleUrls: ['./ventas-mantenimientos.component.css']
})
export class VentasMantenimientosComponent implements OnInit {


  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;


  displayedColumns: string[] = ['cod_Venta', 'tip_Venta', 'cliente', 'direccion','fecha','acciones'];
  dataSource = ELEMENT_DATA;
  constructor(
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }
  consultar(any:[]){
    this.dialog.open(VentasEditarComponent , {
      width: '720px',
      height: '670px',
    });

  }

}
