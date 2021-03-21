import { Component } from '@angular/core';
import { ProductoService } from './services/productoServices/producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  constructor(private productoService:ProductoService){
  }
}
