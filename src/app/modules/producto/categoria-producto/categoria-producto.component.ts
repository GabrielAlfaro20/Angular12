import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  listcat: Categoria[];
  displayedColumns: string[] = ['idcategorias', 'nombreCate', 'acciones'];
  dataSource!: MatTableDataSource<Categoria>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  submittedCategoriaProducto: boolean = false;
  public formCagoriaProducto: FormGroup;
  constructor(private router: Router, private listarCat: CategoriaService, private dialog: MatDialog,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.listarCategoria();
    this.cargarCuentas()
    this.formulario()

    this.listarCat.gettabNumCambio().subscribe(data => {
      this.crearTabla(data);

    })
    this.listarCat.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

  }
  formulario() {
    this.formCagoriaProducto = this.formBuilder.group({
      nombreCate: ['', Validators.required]
    })
  }
  listarCategoria() {
    this.listarCat.listarCategoria().subscribe(data => {
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

  eliminarCategoria(categoria: Categoria) {
    console.log("hola mundo");

    this.dialog.open(ModalEliminarCategoriaComponent, {
      width: '500px',
      height: '250px',
      data: {
        ...categoria,
        principal: categoria
      }
    });


  }
  get f() {
    return this.formCagoriaProducto.controls;
  }
  invalido: boolean = false
  escribirData() {
    if (this.formCagoriaProducto.get('nombreCate').value!='') {
      this.listarCat.listarCategoria().subscribe(data => {
        let repite = data.find(element => element.nombreCate == this.formCagoriaProducto.get('nombreCate').value)
        if (repite != undefined) {
          this.invalido = true
          this.cateRequerido=false
          console.log("existe");
          
        } else {
          this.invalido = false
          this.cateRequerido=false
          console.log("no existe");
          
        }
        this.cateRequerido=false

      })

    } else {
      this.cateRequerido = true
    }
  }

  registrarCategoria(flag: string, formulario: FormGroup) {

  }
  cateGuardar: Categoria
  cateRequerido: boolean = false
  operar() {

    if(this.formCagoriaProducto.invalid){
      this.escribirData()

    }else{
      this.cateGuardar = {
        nombreCate: this.formCagoriaProducto.value.nombreCate
      };
    this.listarCat.registrarCategoria(this.cateGuardar).subscribe(data => {
      if(data['Mensaje']=='Nombre categoria ya existe'){
        this.listarCat.setMensajeCambio('Categoría ya existe')
      }else if(data['Mensaje']=='Registrado correctamento'){
        this.listarCat.setMensajeCambio('Categoria registrado correctamente')
        this.formCagoriaProducto.get('nombreCate').setValue('')
        this.listarCat.listarCategoria().subscribe(data => {
          this.listarCat.settabNumCambio(data)
          this.crearTabla(data);
        });
      }else{
        this.listarCat.setMensajeCambio('Super error')
      }
      
    })
  }
    
    /* if (this.invalido == true) {
      this.escribirData()
    }
    if (this.cateRequerido == true) {
      console.log("prueba invalido");

    }
    if (this.formCagoriaProducto.invalid || this.invalido == true || this.cateRequerido==true ) {
      this.listarCat.setMensajeCambio('Datos incorrectos')

    } else {
      this.invalido=false
      this.cateRequerido=false
    

        this.cateGuardar = {
          nombreCate: this.formCagoriaProducto.value.nombreCate
        };
        console.log(this.cateGuardar);
        this.listarCat.registrarCategoria(this.cateGuardar).subscribe(data => {
          if (data['Mensaje'] == 'Categoría Registrado correctamento') {

            this.listarCat.setMensajeCambio('Categoría Registrado correctamento')
            this.formCagoriaProducto.get('nombreCate').setValue('')
            this.listarCat.listarCategoria().subscribe(data => {
              this.listarCat.settabNumCambio(data)
              this.crearTabla(data);
            });

          } else {
            this.listarCat.setMensajeCambio('Error: Ya existe categoria')

          }

        })
      } */
      
    }
  }


