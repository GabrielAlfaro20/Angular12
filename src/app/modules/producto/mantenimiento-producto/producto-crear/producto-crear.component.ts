import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
//import { threadId } from 'worker_threads';
import { Categoria } from '../../model/categoria';
import { FileHandle } from '../../model/file-handle-model';
import { Caracteristica, Producto } from '../../model/producto';
import { CaracteristicaService } from '../../services/caracteristica.service';
import { CategoriaService } from '../../services/categoria.service';
import { ProductosService } from '../../services/productos.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.component.html',
  styleUrls: ['./producto-crear.component.css']
})

export class ProductoCrearComponent implements OnInit {
  public form: FormGroup
  categoria;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ProductoCrearComponent>,
    private snackBar: MatSnackBar,
    private listarCategoria: CategoriaService,
    private productosService: ProductosService,
    private caracteristica: CaracteristicaService,
    private sanitizar: DomSanitizer


  ) { }

  ngOnInit(): void {
    this.formulario();
    this.cargarCategori();

    this.productosService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

  }
  formulario() {
    this.form = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      txtcategoria: [1, Validators.required],

      caracteristicas: this.formBuilder.array([])
      // precioProducto: ['', Validators.required],
      // cantidadProducto: ['', Validators.required],
      // descripcionProducto: ['', Validators.required],

    })
  }

  /////////////////////////////////////////////
  ArrayImagen: any = []
  onFileSelected(event) {
    this.ArrayImagen = []
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizar.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.ArrayImagen.push(fileHandle);
    }

    console.log(this.ArrayImagen);

  }
  ////////////////////////////////////////////
  categoriaA: any = Categoria
  cargarCategori() {
    this.listarCategoria.listarCategoria().subscribe((data) => {
      this.categoria = data;
      console.log(this.categoria);

    });
  }
  crearFormCaracteristica() {
    return this.formBuilder.group({
      descriCaract: ['', Validators.required],
      cantidCaract: ['', Validators.required],
      precioCaract: ['', Validators.required]
    })
  }

  get caracteristicas() {
    return this.form.get("caracteristicas") as FormArray
  }

  agregarCaracteristica() {
    console.log("Ingreso");


    this.caracteristicas.push(this.crearFormCaracteristica())
    console.log(this.caracteristicas);

  }

  productoA: Producto;
  caracteristicaA: Caracteristica;
  /**** */

  productos: Producto
  guardar() {


    if (this.form.get('nombreProducto').value.trim() == "") {
      console.log("nombreProducto es vacio");
    }
    else {
      console.log("puedes registrar");
      console.log(this.form.get('caracteristicas').value);

      this.productos = {
        idProductoPro: null,
        productImages: this.ArrayImagen,
        nombrePro: this.form.get("nombreProducto").value,
        estadoPro: true,
        categoria: { "idcategorias": this.form.get("txtcategoria").value },
        caracteristicas: this.form.get("caracteristicas").value
      }
      this.productosService.guardarProducto(this.productos).subscribe(data => {
        console.log(data);
        console.log(this.productos);
      })
    }

  }
  cerrar() {
    this.dialogRef.close();
  }

}
