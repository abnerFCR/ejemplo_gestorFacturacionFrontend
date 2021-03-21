import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { Factura } from 'src/app/models/Factura';
import { ClienteService } from 'src/app/services/clienteServices/cliente.service';
import { FacturaService } from 'src/app/services/facturaServices/factura.service';
import { MatTableDataSource } from '@angular/material/table';
import { ExporterService } from 'src/app/services/exporterServices/exporter.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-todas-facturas',
  templateUrl: './todas-facturas.component.html',
  styleUrls: ['./todas-facturas.component.css']
})
export class TodasFacturasComponent implements OnInit {

  public displayedColumns: string[] = ['idFactura', 'nitCliente', 'Fecha', 'estadoTexto', 'total'];

  public facturas: Factura[] = [];
  public clientes: Cliente[] = [];
  public  dataSource:any;

  applyFilter(filterValue: any) {
    if (filterValue.target == null) {
      return;
    }
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  constructor(private facturaService: FacturaService, private clienteService: ClienteService, private exporterService:ExporterService, private toastr:ToastrService) {
    this.traerFacturas();
    this.traerClientes();
    this.dataSource = new MatTableDataSource(this.facturas);

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.facturas);
  }
  traerClientes() {
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
  traerFacturas() {

    this.facturaService.getFacturas().subscribe(
      res => {
        let facturas: Factura[] = <Factura[]>res;
        this.facturas = facturas;
        for (let i = 0; i < this.facturas.length; i++) {
          this.facturas[i].estadoTexto = (parseInt(this.facturas[i].idEstado.toString()) == 1) ? "Eliminado" : (parseInt(this.facturas[i].idEstado.toString()) == 2 ? "Anulado" : "Vigente");
        }
        this.dataSource = new MatTableDataSource(<Factura[]>res);
        return facturas;
      },
      err => {
        this.toastr.error('No se pudieron obtener los id de facturas', 'ERROR!');
        let fac: Factura[] = [];
        return fac;
      }
    );
    let fac: Factura[] = [];
    return fac;
  }
  traerNombreCliente(nitCliente: string) {
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
  exportarTodas(){
    this.exporterService.exportToExcel(this.dataSource.data, 'data');
  }
  exportarFiltros(){
    this.exporterService.exportToExcel(this.dataSource.filteredData, 'filtered_data');
  }
}

