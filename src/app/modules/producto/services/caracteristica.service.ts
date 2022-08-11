import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Caracteristica, Producto } from '../model/producto';

const baseUrl = environment.HOST + '/caracterizticas/'
@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {
  private mensajeCambio = new Subject<string>();
  private tabNumCambio = new Subject<Caracteristica[]>();

  constructor(
    private http:HttpClient
  ) {}

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }


  settabNumCambio(lista: Caracteristica[]) {
    this.tabNumCambio.next(lista);
  }

  gettabNumCambio() {
    return this.tabNumCambio.asObservable();
  }

  listarCaracterizticas(): Observable<Caracteristica[]> {
    return this.http.get<Caracteristica[]> (baseUrl+"listarCaracterizticas");
   }

   eliminarCaracteriztica(parametro:string){
    return this.http.delete(baseUrl+"eliminarCaracteriztica/"+parametro);
  }
  registrarCaracterizticas(parametro:Caracteristica):Observable<Caracteristica[]>{
    return this.http.post<Caracteristica[]>(baseUrl+"registrarCaracterizticas/",parametro);
  }


}
