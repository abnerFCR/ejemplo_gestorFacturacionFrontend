import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Factura } from 'src/app/models/Factura';
import direccion from '../URL';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  API = direccion+'/factura';
  constructor(private http:HttpClient) { }

  getFacturas(){
    return this.http.get(`${this.API}`);
  }
  getFactura(idFactura:string){
    return this.http.get(`${this.API}/${idFactura}`);
  }
  postFactura(factura:Factura){
    return this.http.post(`${this.API}`,factura);
  }
  putFactura(factura:Factura, id:number){
    return this.http.put(`${this.API}/${id}`,factura);
  }
  deleteFactura(id:number){
    return this.http.delete(`${this.API}/${id}`);
  }
}
