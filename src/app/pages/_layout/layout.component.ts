import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/modules/auth/service/login-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  title = 'Data Print';
  public Sidenav: boolean = false;
  isExpanded = true;
  isShowing = false;
  ///
  confiUsuario:boolean=false

  showProductos:boolean=false
  showEmpleados:boolean=false
  showClientes:boolean=false
  showProveedores:boolean=false
  showVentas:boolean=false
  showCompras:boolean=false
  showReportes:boolean=false

  constructor(
    private login:LoginServiceService,
    private router:Router,

  ) { }

  ngOnInit(): void {
//hola
    window.addEventListener('storage', (event) =>{
      if (event.storageArea == localStorage) {
        let token = this.login.getToken();
        if(token == undefined){
          this.router.navigate(['/auth/login'])
        }
      }
    })
  }

  getSidenav(): boolean {
    return this.Sidenav;
  }
  setSidenav(value: boolean) {
    this.Sidenav = value;
  }
  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  //segundo agregado
  cerrarSecion(){
    this.login.clear();
    this.router.navigate(['/auth/login'])
    console.log("cerrando seccion");

  }
}
