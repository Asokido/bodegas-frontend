import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Bodega } from '../../models/bodega.model';

interface FilaProducto {
  producto: string;
  precio: number;
  cantidad: number;
  bodega: string;
}

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './tabla-productos.component.html',
})
export class TablaProductosComponent {
  @Input() bodegas: Bodega[] = [];

  // Aplana las bodegas en filas de producto, cada una con el nombre de su bodega
  get filas(): FilaProducto[] {
    return this.bodegas.flatMap((b) =>
      b.productos.map((p) => ({
        producto: p.nombre,
        precio: p.precio,
        cantidad: p.cantidad,
        bodega: b.nombre,
      }))
    );
  }
}