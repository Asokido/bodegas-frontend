import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';
import { appConfig } from './app.config';
import { Bodega } from './models/bodega.model';

const bodegas: Bodega[] = [
  {
    id: 1,
    nombre: 'Bodega Norte',
    ubicacion: 'Zona norte',
    productos: [
      { id: 1, nombre: 'Computador portátil', descripcion: '', precio: 2500000, cantidad: 15 },
      { id: 2, nombre: 'Monitor', descripcion: '', precio: 750000, cantidad: 20 },
    ],
  },
  {
    id: 2,
    nombre: 'Bodega Sur',
    ubicacion: 'Zona sur',
    productos: [{ id: 3, nombre: 'Impresora', descripcion: '', precio: 1200000, cantidad: 8 }],
  },
];

describe('App', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [...appConfig.providers, provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    http.expectOne('http://localhost:8080/bodegas').flush([]);
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gestión de bodegas');
  });

  it('should show products from GET /bodegas', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    http.expectOne('http://localhost:8080/bodegas').flush(bodegas);
    await fixture.whenStable();

    const filas = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(filas.length).toBe(3);
    expect(filas[0].textContent).toContain('Computador portátil');
    expect(filas[0].textContent).toContain('2.500.000');
    expect(filas[0].textContent).toContain('Bodega Norte');
    expect(filas[2].textContent).toContain('Bodega Sur');
  });
});
