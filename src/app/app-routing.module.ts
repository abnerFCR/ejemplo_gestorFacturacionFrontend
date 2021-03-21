import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturacionClienteComponent } from './components/facturacion-cliente/facturacion-cliente.component';
import { GenerarFacturaComponent } from './components/generar-factura/generar-factura.component';
import { GestionEstadoComponent } from './components/gestion-estado/gestion-estado.component';
import { TodasFacturasComponent } from './components/todas-facturas/todas-facturas.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/todasFacturas',
    pathMatch:'full'
  },
  {
    path:'generarFactura',
    component:GenerarFacturaComponent
  },
  {
    path:'gestionEstado',
    component:GestionEstadoComponent
  },
  {
    path:'facturacionCliente',
    component:FacturacionClienteComponent
  },
  {
    path:'todasFacturas',
    component:TodasFacturasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
