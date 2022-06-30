import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/categoria';

const baseUrl = environment.HOST + '/categoria/'
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private mensajeCambio = new Subject<string>();

  constructor(
    private http:HttpClient
  )
  
  {
   }

   setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

   listarCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]> (baseUrl+"listar");
   }

   eliminarCategoria(parametro:string){
    return this.http.delete(baseUrl+"/eliminar/"+parametro);
  }


   
}
