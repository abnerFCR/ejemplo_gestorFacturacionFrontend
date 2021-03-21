import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import direccion from '../URL';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  API = direccion+'/cliente';
  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get(`${this.API}`);
  }
  getCliente(nit:string){
    return this.http.get(`${this.API}/${nit}`);
  }
  postCliente(cliente:Cliente){
    return this.http.post(`${this.API}`,cliente);
  }
  putCliente(cliente:Cliente, nit:string){
    return this.http.put(`${this.API}/${nit}`,cliente);
  }
  deleteCliente(cliente:Cliente, nit:string){
    return this.http.delete(`${this.API}/${nit}`);
  }
}
