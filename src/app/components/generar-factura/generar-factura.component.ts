import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/Cliente';
import { Detalle } from 'src/app/models/Detalle';
import { Factura } from 'src/app/models/Factura';
import { Producto } from 'src/app/models/Producto';
import { ClienteService } from 'src/app/services/clienteServices/cliente.service';
import { DetalleService } from 'src/app/services/detalleServices/detalle.service';
import { FacturaService } from 'src/app/services/facturaServices/factura.service';
import { ProductoService } from 'src/app/services/productoServices/producto.service';
import { createSemanticDiagnosticsBuilderProgram } from 'typescript';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.css']
})
export class GenerarFacturaComponent implements OnInit {

  public dateDay = '';
  public numeroFac = 0;
  public date: Date;
  public nitCliente: string = '';
  public esNuevo: boolean = true;
  public cantNuevoProducto = 0;
  public idNuevoProducto = 0;
  public total = 0;
  public verificado=false;
  public cliente: Cliente = {
    nombre: '',
    nitCliente: ''
  };

  public detalles: Detalle[] = [];
  constructor(private clienteService: ClienteService, private productoService: ProductoService, private facturaService: FacturaService, 
    private detalleService: DetalleService, private router:Router) {
    this.clienteService.getClientes().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log('No se pudieron obtener los datos de la API');
      }
    );
    this.date = new Date();
    this.dateDay = this.date.getDate() + '/' + ((this.date.getMonth()+1) < 10? "0":"")+(this.date.getMonth() + 1) + '/' + this.date.getFullYear();
    this.numeroFac = this.encontrarNumeroFac();
  }

  ngOnInit(): void {
  }

  nuevoCliente() {
    this.esNuevo = false;
  }
  validarNit() {
    let sinEspacios = this.nitCliente.replace(" ", "");
    let divisionNumero = sinEspacios.split('-');
    if (divisionNumero.length != 2) {
      alert('NIT incorrecto: Formato #########-##');
    }
    let multiplicador = 2;
    let resultadoMultSumado: number = 0;
    for (let i = divisionNumero[0].length - 1; i >= 0; i--) {
      resultadoMultSumado = resultadoMultSumado + parseInt(divisionNumero[0].charAt(i).toString()) * multiplicador;
      multiplicador++;
    }
    let residuoResta = 11 - (resultadoMultSumado % 11);

    if ((residuoResta == 11 && parseInt(divisionNumero[1]) == 0) || (residuoResta == parseInt(divisionNumero[1]))) {
      this.validarCliente();
    } else {
      alert('NIT invalido');
      return;
    }
  }

  validarCliente() {
    this.clienteService.getCliente(this.nitCliente).subscribe(
      res => {
        let clienteRes: Cliente = <Cliente>res;
        if (clienteRes == null) {
          this.generarCliente();
          return;
        }
        this.cliente = clienteRes;
        this.verificado=true;
      },
      err => {
        alert("Ocurrio un error en el servidor / No se pueden obtener los clientes");
      }
    );
  }

  generarCliente() {
    if (this.cliente.nombre == '') {
      alert('Llene el campo nombre!');
      return;
    }
    this.cliente.nitCliente = this.nitCliente.replace(" ", "");
    this.clienteService.postCliente(this.cliente).subscribe(
      res => {
        alert('Cliente Creado con exito');
        this.verificado = true;
      },
      err => {
        alert('Error al crear cliente');
      }
    );
  }
  agregarProducto() {
    this.productoService.getProducto(this.idNuevoProducto).subscribe(
      res => {
        let productoRespuesta: Producto = <Producto>res;
        if (productoRespuesta == null || productoRespuesta == undefined) {
          alert('No existe el producto con el codigo: ' + this.idNuevoProducto);
          return;
        }
        let detalleNuevo: Detalle = {
          idFactura:this.numeroFac,
          cantidad: this.cantNuevoProducto,
          idProducto: this.idNuevoProducto,
          nombreProducto: productoRespuesta.nombre,
          subtotal: productoRespuesta.precio * this.cantNuevoProducto,
          precio: productoRespuesta.precio
        };

        this.detalles.push(detalleNuevo);
        this.total = this.total + this.cantNuevoProducto * productoRespuesta.precio;
      },
      err => {
        alert('Error al comunicarse con el servidor');
      }
    );
  }
  encontrarNumeroFac(): number {
    let idsFacturas:number[]=[];
    this.facturaService.getFacturas().subscribe(
      res => {
        let facturas:Factura[] = <Factura[]>res;
        for(let fac of facturas){
          if(fac.idFactura != null  && fac.idFactura != undefined){
            idsFacturas.push(fac.idFactura);
          }
        }
      },
      err => {
        alert('No se pudieron obtener los id de facturas');
      }
    );
    let encontrado = false;
    while (!encontrado) {
      let numeroFac = Math.floor(Math.random() * (100000 - 1)) + 1;
      if(!idsFacturas.includes(numeroFac)){
        return numeroFac;
      }
    }
    return -1;
  }

  facturar() {

    let factura:Factura = {
      idFactura:this.numeroFac,
      idEstado:3,
      total:this.total,
      Fecha:this.dateDay,
      nitCliente:this.cliente.nitCliente
    }
    let detalleEnvio:Detalle[]=[];
    for(let det of this.detalles){
      let det2:Detalle ={
        idFactura:det.idFactura!=undefined?det.idFactura+0:0,
        idProducto:det.idProducto*100/100,
        cantidad:det.cantidad*100/100
      }
      detalleEnvio.push(det2);
    }
    console.log(detalleEnvio);
    this.facturaService.postFactura(factura).subscribe(
      res=>{
        this.detalleService.postDetalles(detalleEnvio).subscribe(
          res=>{
            alert('Factura Creada con exito');
            this.router.navigate(['/todasFacturas']);
          },
          err=>{
            this.facturaService.deleteFactura(this.numeroFac).subscribe(
              res=>{
                alert('Factura rechazada');
              },
              err=>{
                console.log('Internal Detalle');
              }
            );
            
          }
        );
        
      },
      err=>{
        alert('Factura rechazada!');
      }
    );
    
  }

}
