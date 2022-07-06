import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Empleado } from '../model/empleadoModel';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-confi-empleado',
  templateUrl: './confi-empleado.component.html',
  styleUrls: ['./confi-empleado.component.css']
})
export class ConfiEmpleadoComponent implements OnInit {
  listEmple?: Empleado[];
  displayedColumns: string[]=['idEmpleado','nombresEml','apellidosEmpl','dniEml','correoEmpl','rolEmpl','estadoEmpl','acciones'];
  dataSource!: MatTableDataSource<Empleado>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router: Router, private listarDeEmpleados: EmpleadoService) { }

  ngOnInit(): void {
    this.listarEmleados();
    this.cargardatosProve();
  }
  listarEmleados(){
    this.listarDeEmpleados.listEmpleados().subscribe(data =>{
      console.log(data);
      
    })
  }
  crearTabla(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.hidePageSize = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
 }

 cargardatosProve(){
  this.listarDeEmpleados.listEmpleados().subscribe((data) =>{
    console.log(data);
    this.crearTabla(data);
  })
 }

}
