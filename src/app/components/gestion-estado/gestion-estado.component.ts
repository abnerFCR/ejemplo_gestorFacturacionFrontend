import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private facturaService:FacturaService, private clienteService:ClienteService, private router:Router, private toastr:ToastrService) {
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
        this.toastr.error('No se pudieron obtener los id de facturas', 'ERROR!');
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
        this.toastr.success('Factura anulada con exito','Exito!');
        this.traerFacturas();
      },
      errr=>{
        this.toastr.error('Error al actualizar factura', 'ERROR!');
      }
    );
  }
  eliminar(idFactura:any){
    this.facturaService.deleteFactura(idFactura).subscribe(
      res=>{
        this.toastr.success('Factura eliminada con exito', 'Exito!');
        this.router.navigate(['/todasFacturas']);
      },
      errr=>{
        this.toastr.error('Error al eliminar factura', 'ERROR!');
      }
    );
  }
}
