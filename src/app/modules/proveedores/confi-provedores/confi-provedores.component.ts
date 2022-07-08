import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Proveedor } from '../model/proveedor';
import { ProveedorService } from '../service/proveedor.service';
import { ModalEliminarProveedorComponent } from './modal-eliminar-proveedor/modal-eliminar-proveedor.component';

@Component({
  selector: 'app-confi-provedores',
  templateUrl: './confi-provedores.component.html',
  styleUrls: ['./confi-provedores.component.css']
})
export class ConfiProvedoresComponent implements OnInit {
  listprove? : Proveedor[];
  displayedColumns : string[]=['idProveedor','nombreEmpresa','correo','telefono','direccion','acciones'];
  dataSource!: MatTableDataSource<Proveedor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private router: Router,private listarProveedor: ProveedorService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.listarProveedores();
    this.cargardatosProve()
  }

  listarProveedores(){
    this.listarProveedor.listarProveedor().subscribe(data =>{
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
 }

 cargardatosProve(){
  this.listarProveedor.listarProveedor().subscribe((data) =>{
    console.log(data);
    this.crearTabla(data);
    
  })
 }
 eliminarProveedor(proveedor:Proveedor){
  console.log("hola mundo");
  this.dialog.open(ModalEliminarProveedorComponent, {
    width: '500px',
    height: '250px',
    data: {
      ...proveedor
    }
  });


}

}
