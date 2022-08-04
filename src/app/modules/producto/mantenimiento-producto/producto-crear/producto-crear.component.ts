import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../model/producto';
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
  @Input() target = "../assets/productos";

  constructor(
    private formBuilder: FormBuilder,
    private listarCategoria: CategoriaService,
    private service: ProductosService,
    private dialogRef: MatDialogRef<ProductoCrearComponent>,



  ) { }

  ngOnInit(): void {
    this.formulario();
    this.cargarCategori();

  }
  formulario() {
    this.form = this.formBuilder.group({
      nombreProducto: ['', Validators.required],
      txtcategoria: [, Validators.required],
      imagen: ['', Validators.required]
    })
  }
  file: File;
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
  }
  cargarCategori() {
    this.listarCategoria.listarCategoria().subscribe((data) => {
      this.categoria = data;
      console.log(this.categoria);

    });
  }
  datosReg: Producto;
  guardar() {
    this.service.listarProducto().subscribe(data => {
    console.log(data);

    })
    console.log(this.form.value);
  }
  cerrar() {
    this.dialogRef.close();
  }
}
