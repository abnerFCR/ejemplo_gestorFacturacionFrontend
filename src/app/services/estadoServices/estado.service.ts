import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import direccion from '../URL';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  API = direccion+'/estadofactura';
  constructor(private http:HttpClient) { }

  getEstados(){
    return this.http.get(`${this.API}`);
  }
  getEstado(idEstado:number){
    return this.http.get(`${this.API}/${idEstado}`);
  }
}
