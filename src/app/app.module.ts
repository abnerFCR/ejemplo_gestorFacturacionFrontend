import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GenerarFacturaComponent } from './components/generar-factura/generar-factura.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductoService } from './services/productoServices/producto.service';
import { ClienteService } from './services/clienteServices/cliente.service';
import { DetalleService } from './services/detalleServices/detalle.service';
import { FacturaService } from './services/facturaServices/factura.service';
import { EstadoService } from './services/estadoServices/estado.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionEstadoComponent } from './components/gestion-estado/gestion-estado.component';
import { FacturacionClienteComponent } from './components/facturacion-cliente/facturacion-cliente.component';
import { TodasFacturasComponent } from './components/todas-facturas/todas-facturas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ExporterService } from './services/exporterServices/exporter.service';

@NgModule({
  declarations: [
    AppComponent,
    GenerarFacturaComponent,
    NavBarComponent,
    GestionEstadoComponent,
    FacturacionClienteComponent,
    TodasFacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule
  ],
  providers: [
    ProductoService,
    ClienteService,
    DetalleService,
    FacturaService,
    EstadoService,
    ExporterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

