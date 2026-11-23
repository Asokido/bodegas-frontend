import { Component, OnInit, inject, signal } from '@angular/core';
import { BodegaService } from './services/bodega.service';
import { Bodega } from './models/bodega.model';
import { FormularioBodegaComponent } from './components/formulario-bodega/formulario-bodega.component';
import { TablaProductosComponent } from './components/tabla-productos/tabla-productos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormularioBodegaComponent, TablaProductosComponent],
  template: `
    <main>
      <h1>Gestión de bodegas</h1>
      <app-formulario-bodega (bodegaRegistrada)="cargarBodegas()" />
      <app-tabla-productos [bodegas]="bodegas()" />
      @if (error()) {
        <p class="error">{{ error() }}</p>
      }
    </main>
  `,
})
export class App implements OnInit {
  private bodegaService = inject(BodegaService);

  bodegas = signal<Bodega[]>([]);
  error = signal('');

  ngOnInit(): void {
    this.cargarBodegas();
  }

  // Los datos siempre vienen de GET /bodegas, nunca de valores fijos
  cargarBodegas(): void {
    this.bodegaService.obtenerBodegas().subscribe({
      next: (data) => this.bodegas.set(data),
      error: () => this.error.set('No se pudieron cargar las bodegas. ¿Está corriendo el backend?'),
    });
  }
}