import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { FormularioBodegaComponent } from './formulario-bodega.component';

describe('FormularioBodegaComponent', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioBodegaComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  it('should not send empty form', () => {
    const component = TestBed.createComponent(FormularioBodegaComponent).componentInstance;
    component.form.setValue({ nombre: '  ', ubicacion: '' });
    component.guardar();

    http.expectNone('http://localhost:8080/bodegas');
  });

  it('should send POST /bodegas', () => {
    const component = TestBed.createComponent(FormularioBodegaComponent).componentInstance;
    component.form.setValue({ nombre: 'Bodega Centro', ubicacion: 'Zona centro' });
    component.guardar();

    const req = http.expectOne('http://localhost:8080/bodegas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ nombre: 'Bodega Centro', ubicacion: 'Zona centro' });
    req.flush({ id: 3, nombre: 'Bodega Centro', ubicacion: 'Zona centro', productos: [] });

    expect(component.mensaje()).toContain('Bodega Centro');
  });
});
