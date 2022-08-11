import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from '../../model/categoria';
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
    private producto: ProductosService,
    private caracteristica: CaracteristicaService,



  ) { }

  ngOnInit(): void {
    this.formulario();
    this.cargarCategori();

    this.producto.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

  }
  formulario() {
    this.form = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      txtcategoria: [1, Validators.required],
      precioProducto: ['', Validators.required],
      cantidadProducto: ['', Validators.required],
      descripcionProducto: ['', Validators.required],

    })
  }
  /*   file: File;
    photoSelected: String | ArrayBuffer;
    onPhotoSelected(event): void { //HtmlInputEvent
      if (event.target.files && event.target.files[0]) {
        this.file = <File>event.target.files[0];
        var filesX = this.file.name
        console.log(this.file);
        console.log(this.photoSelected);


        var verifica = filesX.substring(filesX.length - 3)
        if (verifica == 'txt') {
          console.log("no puedes elegir esa tipo de extencion");

        }
        else {
          const reader = new FileReader();
          reader.onload = e => this.photoSelected = reader.result;
          reader.readAsDataURL(this.file);
        }
      }
    } */

  categoriaA: any = Categoria
  cargarCategori() {
    this.listarCategoria.listarCategoria().subscribe((data) => {
      this.categoria = data;
      console.log(this.categoria);

    });
  }
  productoA: Producto;
  caracteristicaA: Caracteristica;
  /**** */
  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  guardar() {
    if (!this.files[0]) {
      this.producto.setMensajeCambio("debes ingresar una imagen")
    } else {

      if (this.form.get('nombreProducto').value.trim() == "" ) {
        console.log("nombreProducto es vacio");
      }
      if (this.form.get('precioProducto').value.trim() == '' || this.form.value.precioProducto == undefined) {
        console.log("precioProducto es vacio");
      }
      if (this.form.get('cantidadProducto').value.trim() == '' || this.form.value.cantidadProducto == undefined) {
        console.log("cantidadProducto es vacio")
      }
      if (this.form.get('descripcionProducto').value.trim() == ''|| this.form.value.descripcionProducto == undefined) {
        console.log("descripcionProducto es vacio");
      }
      else {
        console.log("puedes registrar");
        //imagen
        const file_data = this.files[0];
        const data =new FormData();
        data.append('file',file_data);
        data.append('upload_preset','DataPrint');
        data.append('cloud_name', 'dq6j3pllk')

      }
    }
    /*   this.productoA = {
        imageProp: "hola",
        nombrePro: this.form.get("nombreProducto").value,//
        estadoPro: "1",
      }
      this.categoriaA = {
        idcategorias: this.form.get('txtcategoria').value,
      }
      this.caracteristicaA = {
        descriCaract: this.form.get('descripcionProducto').value,
        cantidCaract: this.form.get('cantidadProducto').value,
        precioCaract: this.form.get('precioProducto').value,
      },
      console.log(this.caracteristicaA);
      console.log(this.productoA);
      console.log(this.categoriaA);

      this.producto.guardarProducto(this.productoA).subscribe(caracteris => {
        if(caracteris['Mensaje'] == 'Ya existe producto'){
          console.log("ya existe");
        }
        else{
          this.caracteristica.registrarCaracterizticas(this.caracteristicaA).subscribe((data) => {
            console.log(data);
          })
        }

      }) */
    /*       this.caracteristica.listarCaracterizticas().subscribe(data => {
          }) */
    //this.array1 = this.array1.filter((value) => value !== String(va.cl_codcia))


  }
  cerrar() {
    this.dialogRef.close();
  }

}
