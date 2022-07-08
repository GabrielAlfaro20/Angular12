import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalEliminarCategoriaComponent } from '../modal-eliminar-categoria/modal-eliminar-categoria.component';
import { Categoria } from '../model/categoria';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  listcat : Categoria[];
  displayedColumns : string []=['idcategorias','nombreCate','acciones'];
  dataSource!: MatTableDataSource<Categoria>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   
   submittedCategoriaProducto:boolean = false;
   public formCagoriaProducto:FormGroup;
  constructor(private router: Router, private listarCat: CategoriaService, private dialog: MatDialog,
     private formBuilder: FormBuilder,)  { }

  ngOnInit(): void {
    this.listarCategoria();
    this.cargarCuentas()
    this.formCagoriaProducto = this.formBuilder.group({
      idcategorias:['', Validators.required],
      nombreCate:['']
    })
  }
  listarCategoria(){
    this.listarCat.listarCategoria().subscribe(data =>{
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
  cargarCuentas() {
    this.listarCat.listarCategoria().subscribe((data) => {
      console.log(data);
      this.crearTabla(data);
    });
}

eliminarCategoria(categoria:Categoria){
  console.log("hola mundo");
  
  this.dialog.open(ModalEliminarCategoriaComponent , {
    width: '500px',
    height: '250px',
    data: {
      ...categoria
    }
  });


}
/* consultar(any:[]){
  console.log("hola mundo");
  
  this.dialog.open(ModalEliminarCategoriaComponent , {
    width: '720px',
    height: '670px',
  });
} */
registrarCategoria(flag:string, formulario:FormGroup){
  
}
operar(){
  this.registrarCategoria("",this.formCagoriaProducto);

}

}
