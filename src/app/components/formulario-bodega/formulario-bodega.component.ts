import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BodegaService } from '../../services/bodega.service';
import { Bodega } from '../../models/bodega.model';

@Component({
  selector: 'app-formulario-bodega',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-bodega.component.html',
})
export class FormularioBodegaComponent {
  private fb = inject(FormBuilder);
  private bodegaService = inject(BodegaService);

  @Output() bodegaRegistrada = new EventEmitter<Bodega>();

  mensaje = signal('');
  error = signal('');
  enviando = signal(false);

  form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    ubicacion: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]],
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.error.set('');
    this.mensaje.set('');

    const { nombre, ubicacion } = this.form.getRawValue();

    this.bodegaService.registrarBodega({ nombre: nombre.trim(), ubicacion: ubicacion.trim() }).subscribe({
      next: (bodega) => {
        this.mensaje.set(`Bodega "${bodega.nombre}" registrada.`);
        this.form.reset();
        this.enviando.set(false);
        this.bodegaRegistrada.emit(bodega);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.error.set('Datos inválidos, revisa el nombre y la ubicación.');
        } else if (err.status === 0) {
          this.error.set('No se pudo conectar con el backend, verifica que esté corriendo.');
        } else {
          this.error.set('No se pudo registrar la bodega.');
        }
        this.enviando.set(false);
      },
    });
  }
}
