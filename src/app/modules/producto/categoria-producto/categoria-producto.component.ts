import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  listcat? : Categoria[];
  displayedColumns : string []=['nombreCate','acciones'];
  dataSource!: MatTableDataSource<Categoria>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private listarCat: CategoriaService)  { }

  ngOnInit(): void {
    this.listarCategoria();
    this.cargarCuentas()
  
   

  }

  listarCategoria(){
    this.listarCat.listarCategoria().subscribe(data =>{
      console.log(data);
      
    })
  }
  consultar(){

  }

  crearTabla(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.hidePageSize = false;
  }

  cargarCuentas() {
    this.listarCat.listarCategoria().subscribe((data) => {
      console.log(data);
      this.crearTabla(data);
      

    });
}
}
