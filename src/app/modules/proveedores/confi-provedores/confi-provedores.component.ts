import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { elementAt } from 'rxjs/operators';
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

  public formProveedor:FormGroup;
  constructor(private router: Router,private listarProveedor: ProveedorService,private dialog: MatDialog,
    private formBuilder: FormBuilder,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarProveedores();
    this.cargardatosProve();
    this.formularioProveedor();

    this.listarProveedor.gettabNumCambio().subscribe(data =>{
      this.crearTabla(data);
    })
    this.listarProveedor.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

  }
  formularioProveedor(){
    this.formProveedor = this.formBuilder.group({
      nombreEmpresa:[''],
      correo: [''],
      telefono:[''],
      direccion:['']
    })
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
get f() {
  return this.formProveedor.controls;
}
invalido: boolean=false
escribirData()/* {
  if(this.formProveedor.get('nombreEmpresa').value.length>=1 &&
     this.formProveedor.get('correo').value.length>=1 &&
     this.formProveedor.get('telefono').value.length>=1 &&
     this.formProveedor.get('direccion').value.length>=1){
      this.listarProveedor.listarProveedor().subscribe(data =>{
        let repite=data.find(element =>element.nombreEmpresa==this.formProveedor.get('nombreEmpresa').value ||
                                       element.correo==this.formProveedor.get('correo').value ||
                                       element.telefono==this.formProveedor.get('telefono').value ||
                                       element.direccion==this.formProveedor.get('direccion').value)
        if(repite !=undefined){
          this.invalido=true
          this.formProveedor.get('nombreEmpresa').setValidators([Validators.required])
          this.formProveedor.get('nombreEmpresa').updateValueAndValidity()
          this.formProveedor.get('correo').setValidators([Validators.required])
          this.formProveedor.get('correo').updateValueAndValidity()
          this.formProveedor.get('telefono').setValidators([Validators.required])
          this.formProveedor.get('telefono').updateValueAndValidity()
          this.formProveedor.get('direccion').setValidators([Validators.required])
          this.formProveedor.get('direccion').updateValueAndValidity()
        }else{
          this.invalido=false
          this.formProveedor.get('nombreEmpresa').clearValidators()
          this.formProveedor.get('nombreEmpresa').updateValueAndValidity()
          this.formProveedor.get('correo').clearValidators()
          this.formProveedor.get('correo').updateValueAndValidity()
          this.formProveedor.get('telefono').clearValidators()
          this.formProveedor.get('telefono').updateValueAndValidity()
          this.formProveedor.get('direccion').clearValidators()
          this.formProveedor.get('direccion').updateValueAndValidity()
        }
      })

  }else{
    this.invalido=false
  }
} */
{
  if(this.formProveedor.get('nombreEmpresa').value.length>=1){
    this.listarProveedor.listarProveedor().subscribe(data =>{
      let repite=data.find(element =>element.nombreEmpresa==this.formProveedor.get('nombreEmpresa').value)
      if(repite !=undefined){
        this.invalido=true
        this.formProveedor.get('nombreEmpresa').setValidators([Validators.required])
        this.formProveedor.get('nombreEmpresa').updateValueAndValidity()

      }else{
        this.invalido=false
        this.formProveedor.get('nombreEmpresa').clearValidators()
        this.formProveedor.get('nombreEmpresa').updateValueAndValidity()
      }
    })
  }else{
    this.invalido=false
  }




}
escribirData1(){
  if(this.formProveedor.get('correo').value.length>=1){
    this.listarProveedor.listarProveedor().subscribe(data =>{
      let repite=data.find(element =>element.correo==this.formProveedor.get('nombreEmpresa').value)
      if(repite !=undefined){
        this.invalido=true
        this.formProveedor.get('correo').setValidators([Validators.required])
        this.formProveedor.get('correo').updateValueAndValidity()

      }else{
        this.invalido=false
        this.formProveedor.get('correo').clearValidators()
        this.formProveedor.get('correo').updateValueAndValidity()
      }
    })
  }else{
    this.invalido=false
  }

}



proveedorGuardar: Proveedor
operar(){
  if(this.invalido==true){
    this.escribirData()
    this.escribirData1()
  }
  if(this.formProveedor.invalid || this.invalido==true){
    this.listarProveedor.setMensajeCambio('Datos incorrectos')

  }else{
    this.proveedorGuardar={
      nombreEmpresa:this.formProveedor.value.nombreEmpresa,
      correo:this.formProveedor.value.correo,
      telefono:this.formProveedor.value.telefono,
      direccion:this.formProveedor.value.direccion
    };
    console.log(this.proveedorGuardar);
    this.listarProveedor.registrarProveedor(this.proveedorGuardar).subscribe(data =>{
      if(data['Mensaje']=='Proveedor registrado correctamente'){
        this.listarProveedor.setMensajeCambio('Proveedor registrado correctamente')
        this.formProveedor.get('nombreEmpresa').setValue('')
        this.formProveedor.get('correo').setValue('')
        this.formProveedor.get('telefono').setValue('')
        this.formProveedor.get('direccion').setValue('')

        this.listarProveedor.listarProveedor().subscribe(data =>{
          this.listarProveedor.settabNumCambio(data)
          this.crearTabla(data);
        });
        
      }else{
        this.listarProveedor.setMensajeCambio('Error: Ya existe proveedor')
      }
    })
    
  }
}

}
