import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Producto } from '../model/producto';
import { CategoriaService } from '../services/categoria.service';
import { ProductosService } from '../services/productos.service';



@Component({
  selector: 'app-mantenimiento-producto',
  templateUrl: './mantenimiento-producto.component.html',
  styleUrls: ['./mantenimiento-producto.component.css']
})
export class MantenimientoProductoComponent implements OnInit {
  

  displayedColumns: string[] = ['idProductoPro', 'nombrePro', 'nombreCate','imageProp',  'estadoPro','acciones'];
  dataSource!: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private listarProducto: ProductosService,private listarCategoria: CategoriaService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }


  
  ngOnInit(): void {
    this.listarProductos();
    this.cargardatosProduct();

    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  operar(){
    
  }

  listarProductos() {
    this.listarCategoria.listarCategoria().subscribe(data => {
      console.log(data);

    })
  }
  

  cargardatosProduct() {

    this.listarProducto.listarProducto().subscribe((data) => {
      console.log(data);
      this.crearTabla(data);
    })

    
  }

  

  crearTabla(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.hidePageSize = false;
  }
  
  

}
