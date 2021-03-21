import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Detalle } from 'src/app/models/Detalle';
import direccion from '../URL';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  API = direccion+'/detalle';
  constructor(private http:HttpClient) {

  }
  getDetalles(){
    return this.http.get(`${this.API}`);
  }
  getDetalle(idFactura:number){
    return this.http.get(`${this.API}/${idFactura}`);
  }
  getDetalleFacPro(idFactura:number,idProducto:number){
    return this.http.get(`${this.API}/${idFactura}/${idProducto}`);
  }
  postDetalles(detalles:Detalle[]){
    return this.http.post(`${this.API}`,detalles);
  }
  postDetalle(detalle:Detalle){
    return this.http.post(`${this.API}`,detalle);
  }
}
