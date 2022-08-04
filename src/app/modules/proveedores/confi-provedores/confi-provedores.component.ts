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
import { ProveedorEditarComponent } from './proveedor-editar/proveedor-editar.component';

@Component({
  selector: 'app-confi-provedores',
  templateUrl: './confi-provedores.component.html',
  styleUrls: ['./confi-provedores.component.css']
})
export class ConfiProvedoresComponent implements OnInit {
  listprove?: Proveedor[];
  displayedColumns: string[] = ['idProveedor', 'nombreEmpresa', 'correo', 'telefono', 'direccion', 'acciones'];
  dataSource!: MatTableDataSource<Proveedor>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public formProveedor: FormGroup;
  constructor(private router: Router, private listarProveedor: ProveedorService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarProveedores();
    this.cargardatosProve();
    this.formularioProveedor();

    this.listarProveedor.gettabNumCambio().subscribe(data => {
      this.crearTabla(data);
    })
    this.listarProveedor.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

  }
  formularioProveedor() {
    this.formProveedor = this.formBuilder.group({
      nombreEmpresa: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    })
  }

  listarProveedores() {
    this.listarProveedor.listarProveedor().subscribe(data => {
      console.log(data);

    })
  }

  editar(provee:Proveedor){
    this.dialog.open(ProveedorEditarComponent , {
      width: '600px',
      height: '550px',
      data: provee
    });

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

  cargardatosProve() {
    this.listarProveedor.listarProveedor().subscribe((data) => {
      console.log(data);
      this.crearTabla(data);

    })
  }
  eliminarProveedor(proveedor: Proveedor) {
    console.log("hola mundo");
    this.dialog.open(ModalEliminarProveedorComponent, {
      width: '600px',
      height: '250px',
      data: {
        ...proveedor
      }
    });


  }
  get f() {
    return this.formProveedor.controls;
  }

  invalido1: boolean = false


  requerido1: boolean = false
  requerido2: boolean = false
  requerido3: boolean = false
  requerido4: boolean = false

  escribir(param:string){
    if(param=='nombreEmpresa'){

      if(this.formProveedor.get('nombreEmpresa').value!=''){
        this.listarProveedor.listarProveedor().subscribe(data =>{
          let prove = data.find(element =>element.nombreEmpresa==this.formProveedor.get('nombreEmpresa').value)
          if(prove!=undefined){
            this.invalido1=true
            this.requerido1=false
            console.log("existe");
            
          }else{
            console.log("no existe");
            this.requerido1=false
            this.invalido1=false
          }
        })
        this.requerido1=false


      }else{
        this.requerido1=true
      }

    }
    else if(param=='correo'){
      if(this.formProveedor.get('correo').value!=''){
        this.requerido2=false

      }else{
        this.requerido2=true
      }

    }
    else if(param=='telefono'){
      if(this.formProveedor.get('telefono').value!=''){
        this.requerido3=false

      }else{
        this.requerido3=true
      }

    }
    else if(param=='direccion'){
      if(this.formProveedor.get('direccion').value!=''){
        this.requerido4=false

      }else{
        this.requerido4=true
      }

    }

  }
  proveedorGuardar: Proveedor


  operar() {
    if (this.formProveedor.invalid) {
      this.escribir('nombreEmpresa')
      this.escribir('correo')
      this.escribir('telefono')
      this.escribir('direccion')

    }else{
      this.proveedorGuardar={
        nombreEmpresa:this.formProveedor.value.nombreEmpresa,
        correo:this.formProveedor.value.correo,
        telefono:this.formProveedor.value.telefono,
        direccion:this.formProveedor.value.direccion
      };
      this.listarProveedor.registrarProveedor(this.proveedorGuardar).subscribe(data =>{ 
          if(data['Mensaje']=='Ya existe proveedor'){
            this.listarProveedor.setMensajeCambio('Ya existe proveedor')
          }
            else if(data['Mensaje']=='Proveedor registrado correctamente'){
              this.formProveedor.get('nombreEmpresa').setValue('')
          this.formProveedor.get('correo').setValue('')
          this.formProveedor.get('telefono').setValue('')
          this.formProveedor.get('direccion').setValue('')
  
              this.listarProveedor.setMensajeCambio('Proveedor registrado correctamente')
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

 