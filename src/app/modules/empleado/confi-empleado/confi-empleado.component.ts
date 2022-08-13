import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Empleado } from '../model/empleadoModel';
import { EmpleadoService } from '../service/empleado.service';
import { ConsultarEmpleadoComponent } from './consultar-empleado/consultar-empleado.component';
import { EmpleadoEditarComponent } from './empleado-editar/empleado-editar.component';
import { ModalEliminarEmpleadoComponent } from './modal-eliminar-empleado/modal-eliminar-empleado.component';

@Component({
  selector: 'app-confi-empleado',
  templateUrl: './confi-empleado.component.html',
  styleUrls: ['./confi-empleado.component.css']
})
export class ConfiEmpleadoComponent implements OnInit {
  listEmple?: Empleado[];
  displayedColumns: string[]=['idEmpleado','nombresEml','apellidosEmpl','dniEml','correoEmpl','rolEmpl','estadoEmpl','acciones'];
  dataSource!: MatTableDataSource<Empleado>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  visible: boolean = true;
  changetype: boolean = true;

  public formEmpleado: FormGroup;
  constructor(private router: Router, private listarDeEmpleados: EmpleadoService,private dialog: MatDialog,
    private formBuilder: FormBuilder,private snackBar: MatSnackBar,private changeDetectorRefs: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.listarEmleados();
    this.cargardatosProve();
    this.formularioEmpleado();
    this.verPassword();


    this.listarDeEmpleados.gettabNumCambio().subscribe(data => {
      this.crearTabla(data);
    })
    this.listarDeEmpleados.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });
  
  }
  verPassword(){
    this.visible =!this.visible
    this.changetype = !this.changetype
  }
  formularioEmpleado(){
    this.formEmpleado=this.formBuilder.group({
      nombresEml: ['',Validators.required],
      apellidosEmpl: ['',Validators.required],
      dniEml: ['',Validators.required],
      correoEmpl: ['',Validators.required],
      passwordEmpl:['',Validators.required],
      rolEmpl:['',Validators.required],
      estadoEmpl:[true,Validators.required]
    })

  }

  listarEmleados(){
    this.listarDeEmpleados.listEmpleados().subscribe(data =>{
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

 editar(emplea:Empleado){
  this.dialog.open(EmpleadoEditarComponent , {
    width: '760px',
    height: '620px',
    data:emplea
  });

}

consultar(emplea:Empleado){
  this.dialog.open(ConsultarEmpleadoComponent , {
    width: '760px',
    height: '620px',
    data:emplea
  });

}

 cargardatosProve(){
  this.listarDeEmpleados.listEmpleados().subscribe((data) =>{
    console.log(data);
    this.crearTabla(data);
  })
 }
 eliminarEmpleado(empleado:Empleado){
  this.dialog.open(ModalEliminarEmpleadoComponent , {
    width: '500px',
    height: '250px',
    data: {
      ...empleado
    }
  });
}
get f(){
  return this.formEmpleado.controls;
}

invalido1: boolean=false

requerido1: boolean = false
  requerido2: boolean = false
  requerido3: boolean = false
  requerido4: boolean = false
  requerido5: boolean = false
  requerido6: boolean = false
  estado: boolean = false

escribir(param:string){
  if(param=='dniEml'){
    if(this.formEmpleado.get('dniEml').value!=''){
      this.listarDeEmpleados.listEmpleados().subscribe(data =>{
        let emple = data.find(element =>element.dniEml==this.formEmpleado.get('dniEml').value)
        if(emple!=undefined){
          this.invalido1=true
          this.requerido3=false
          console.log("existe");
        }else{
          console.log("no existe");
          this.requerido3=false
          this.invalido1=false
        }
      })
      this.requerido3=false
    }
    else{
      this.requerido3=true
    }
  }
  else if(param=='nombresEml'){
    if(this.formEmpleado.get('nombresEml').value!=''){
      this.requerido1=false
    }else{
      this.requerido1=true
    }
  }
  else if(param=='apellidosEmpl'){
    if(this.formEmpleado.get('apellidosEmpl').value!=''){
      this.requerido2=false
    }else{
      this.requerido2=true
    }
  }
  else if(param=='passwordEmpl'){
    if(this.formEmpleado.get('passwordEmpl').value!=''){
      this.requerido4=false
    }else{
      this.requerido4=true
    }
  }
  else if(param=='correoEmpl'){
    if(this.formEmpleado.get('correoEmpl').value!=''){
      this.requerido5=false
    }else{
      this.requerido5=true
    }
  }
  else if(param=='rolEmpl'){
    if(this.formEmpleado.get('rolEmpl').value!=''){
      this.requerido6=false
    }else{
      this.requerido6=true
    }
  }

}
empleadorGuardar: Empleado

operar(){
  if(this.formEmpleado.invalid){
    this.escribir('nombresEml')
    this.escribir('apellidosEmpl')
    this.escribir('dniEml')
    this.escribir('correoEmpl')
    this.escribir('passwordEmpl')
    this.escribir('rolEmpl')
  }else{
    this.empleadorGuardar={
      nombresEml:this.formEmpleado.value.nombresEml,
      apellidosEmpl:this.formEmpleado.value.apellidosEmpl,
      dniEml:this.formEmpleado.value.dniEml,
      correoEmpl:this.formEmpleado.value.correoEmpl,
      passwordEmpl:this.formEmpleado.value.passwordEmpl,
      rolEmpl:this.formEmpleado.value.rolEmpl,
      estadoEmpl:this.formEmpleado.value.estadoEmpl==true?'1':'0'
      
    };
    console.log(this.empleadorGuardar);
    
    this.listarDeEmpleados.registrarEmpleado(this.empleadorGuardar).subscribe(data =>{
      if(data['Mensaje']=='Ya existe empleado con este DNI'){
        this.listarDeEmpleados.setMensajeCambio('Ya existe empleado con este DNI')
        
        this.changeDetectorRefs.detectChanges();
      }
      else if(data['Mensaje']=='Empleado registrado correctamente'){
        this.formEmpleado.reset()
        this.listarDeEmpleados.setMensajeCambio('Empleado registrado correctamente')

        this.changeDetectorRefs.detectChanges();
        
        this.listarDeEmpleados.listEmpleados().subscribe(data =>{
          this.listarDeEmpleados.settabNumCambio(data)
          this.crearTabla(data);
        });
      }else{
        this.listarDeEmpleados.setMensajeCambio('Error: Ya existe empleado')

      }
    })
  }
}

}
