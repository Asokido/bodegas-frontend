# bodegas-frontend

Frontend en Angular para registrar bodegas y ver los productos de cada una.
Usa la API de [bodegas-backend](https://github.com/Asokido/bodegas-backend).

## Requisitos

- Node.js 22.22+ o 24.15+
- El backend corriendo en `http://localhost:8080`

## Ejecutar

```bash
npm install
npm start
```

Después abrir `http://localhost:4200` en el navegador. (También funciona `ng serve` si se tiene Angular CLI instalado.)

## Funcionalidades

- Formulario para registrar bodegas (nombre y ubicación), usa `POST /bodegas`.
- Tabla con los productos y su bodega (Producto, Precio, Cantidad, Bodega). Los datos vienen de `GET /bodegas`.

## Estructura

- `src/app/models`: interfaces `Bodega`, `Producto` y `BodegaRequest`.
- `src/app/services`: `BodegaService`, consume `GET /bodegas` y `POST /bodegas`.
- `src/app/components/formulario-bodega`: formulario de registro.
- `src/app/components/tabla-productos`: tabla de productos.

## Pruebas

```bash
npm test
```
