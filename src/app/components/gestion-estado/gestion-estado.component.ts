import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { Factura } from 'src/app/models/Factura';
import { ClienteService } from 'src/app/services/clienteServices/cliente.service';
import { FacturaService } from 'src/app/services/facturaServices/factura.service';

@Component({
  selector: 'app-gestion-estado',
  templateUrl: './gestion-estado.component.html',
  styleUrls: ['./gestion-estado.component.css']
})
export class GestionEstadoComponent implements OnInit {

  public facturas:Factura[]=[];
  public clientes:Cliente[]=[];

  constructor(private facturaService:FacturaService, private clienteService:ClienteService, private router:Router) {
    this.traerClientes();
    this.traerFacturas();
  }

  ngOnInit(): void {
  }
  traerClientes(){
    this.clienteService.getClientes().subscribe(
      res => {
        console.log(res);
        this.clientes = <Cliente[]>res;
      },
      err => {
        console.log('No se pudieron obtener los datos de la API');
      }
    );
  }
  traerFacturas(){
    
    this.facturaService.getFacturas().subscribe(
      res => {
        let facturas:Factura[] = <Factura[]>res;
        console.log(res);
        this.facturas = facturas;
        for(let i=0;i<this.facturas.length;i++){
          this.facturas[i].estadoTexto = (parseInt(this.facturas[i].idEstado.toString())==1)?"Eliminado":(parseInt(this.facturas[i].idEstado.toString())==2?"Anulado":"Vigente");
        }
      },
      err => {
        alert('No se pudieron obtener los id de facturas');
      }
    );
    
  }
  traerNombreCliente(nitCliente:string){
    this.clienteService.getCliente(nitCliente).subscribe(
      res => {
        let clienteRes: Cliente = <Cliente>res;
        return clienteRes.nombre;
      },
      err => {
        return '-------';
      }
    );
  }
  anular(factura:any){
    factura.idEstado = 2;
    this.facturaService.putFactura(factura, factura.idFactura).subscribe(
      res=>{
        alert('Factura anulada con exito');
        this.traerFacturas();
      },
      errr=>{
        alert('Error al actualizar factura');
      }
    );
  }
  eliminar(idFactura:any){
    this.facturaService.deleteFactura(idFactura).subscribe(
      res=>{
        alert('Factura eliminada con exito');
        this.router.navigate(['/todasFacturas']);
      },
      errr=>{
        alert('Error al eliminar factura');
      }
    );
  }
}
