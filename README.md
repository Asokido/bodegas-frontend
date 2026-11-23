# bodegas-frontend

Frontend en Angular para registrar bodegas y consultar los productos asociados a cada una.

## Requisitos

- Node.js LTS
- Angular CLI (`npm install -g @angular/cli`)
- El backend `bodegas-backend` corriendo en `http://localhost:8080`

## Ejecutar

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:

   ```bash
   ng serve
   ```

3. Abre `http://localhost:4200` en el navegador.

## Estructura

- `src/app/models`: interfaces `Bodega`, `Producto` y `BodegaRequest`.
- `src/app/services`: `BodegaService`, que consume `GET /bodegas` y `POST /bodegas`.
- `src/app/components/formulario-bodega`: formulario para registrar bodegas.
- `src/app/components/tabla-productos`: tabla de productos con su bodega.