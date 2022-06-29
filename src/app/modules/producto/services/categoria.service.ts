import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../model/categoria';

const baseUrl = environment.HOST + '/categoria/'
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http:HttpClient
  )
  
  {
   }
   listarCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]> (baseUrl+"listar");
   }



   
}
