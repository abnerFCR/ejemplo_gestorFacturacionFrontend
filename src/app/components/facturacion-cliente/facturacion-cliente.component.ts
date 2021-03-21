import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente, ClienteRepo } from 'src/app/models/Cliente';
import { Factura } from 'src/app/models/Factura';
import { ClienteService } from 'src/app/services/clienteServices/cliente.service';
import { FacturaService } from 'src/app/services/facturaServices/factura.service';

@Component({
  selector: 'app-facturacion-cliente',
  templateUrl: './facturacion-cliente.component.html',
  styleUrls: ['./facturacion-cliente.component.css']
})
export class FacturacionClienteComponent implements OnInit {

 
  public facturas:Factura[]=[];
  public clientes:ClienteRepo[]=[];
  constructor(private facturaService:FacturaService, private clienteService:ClienteService, private router:Router,
    private toastr:ToastrService) {
    this.traerClientes();
    this.traerFacturas();
    this.completarInfo();
    
  }

  ngOnInit(): void {
  }
  traerClientes(){
    this.clienteService.getClientes().subscribe(
      res => {
        console.log(res);
        this.clientes = <ClienteRepo[]>res;
      },
      err => {
        this.toastr.error('No se pudieron obtener los datos de la API','ERROR!')
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
        this.completarInfo();
      },
      err => {
        this.toastr.error('No se pudieron obtener los id de facturas','ERROR!');
      }
    );
    
  }
  completarInfo(){
    for(let i=0; i<this.clientes.length; i++){
      this.clientes[i].facAnuladas=0;
      this.clientes[i].facVigentes=0;
      this.clientes[i].totalFacturacionAnulada=0;
      this.clientes[i].totalFacturacion=0;
      for(let j=0; j<this.facturas.length; j++){
        if(this.clientes[i].nitCliente.toString()==this.facturas[j].nitCliente.toString()){
          if((parseInt(this.facturas[j].idEstado.toString())==2)){
            this.clientes[i].facAnuladas++;
            this.clientes[i].totalFacturacionAnulada=this.clientes[i].totalFacturacionAnulada+this.facturas[j].total;
          }else{
            this.clientes[i].facVigentes++;
            this.clientes[i].totalFacturacion=this.clientes[i].totalFacturacion+this.facturas[j].total;
          }
        }
      }
    }
    console.log(this.clientes);
  }

}
