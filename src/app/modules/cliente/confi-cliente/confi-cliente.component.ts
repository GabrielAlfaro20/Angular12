import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router, RouterModule } from '@angular/router';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-confi-cliente',
  templateUrl: './confi-cliente.component.html',
  styleUrls: ['./confi-cliente.component.css']
})
export class ConfiClienteComponent implements OnInit {
  listCli?: Cliente[];
  displayedColumns: string[]=['idcliente','nombre','apellido','dni','telefono','direcc','acciones']
  dataSource!: MatTableDataSource<Cliente>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router: Router, private listaDeClientes: ClienteService ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.cargardatosClient();
  }

  listarClientes(){
    this.listaDeClientes.listClientes().subscribe(data =>{
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
 cargardatosClient(){
  this.listaDeClientes.listClientes().subscribe((data) =>{
    console.log(data);
    this.crearTabla(data);
    
  })
 }

}
