import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Producto } from 'src/app/models/Producto';
import direccion from '../URL';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API = direccion+'/producto';
  constructor(private http:HttpClient) {

  }
  getProductos(){
    console.log(this.API);
    return this.http.get(`${this.API}`);
  }
  getProducto(id:number){
    return this.http.get(`${this.API}/${id}`);
  }
  postProducto(producto:Producto){
    return this.http.post(`${this.API}`,producto);
  }
  putProducto(producto:Producto, id:number){
    return this.http.put(`${this.API}/${id}`,producto);
  }
  deleteProducto(id:number){
    return this.http.delete(`${this.API}/${id}`);
  }
}
