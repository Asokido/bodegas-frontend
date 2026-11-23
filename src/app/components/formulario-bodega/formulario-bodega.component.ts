import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
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
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    ubicacion: ['', [Validators.required, Validators.maxLength(200)]],
  });

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.error.set('');
    this.mensaje.set('');

    this.bodegaService.registrarBodega(this.form.getRawValue()).subscribe({
      next: (bodega) => {
        this.mensaje.set(`Bodega "${bodega.nombre}" registrada.`);
        this.form.reset();
        this.enviando.set(false);
        this.bodegaRegistrada.emit(bodega);
      },
      error: () => {
        this.error.set('No se pudo registrar la bodega. Verifica que el backend esté en ejecución.');
        this.enviando.set(false);
      },
    });
  }
}