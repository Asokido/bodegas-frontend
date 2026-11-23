import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bodega, BodegaRequest } from '../models/bodega.model';

@Injectable({ providedIn: 'root' })
export class BodegaService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/bodegas';

  obtenerBodegas(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.apiUrl);
  }

  registrarBodega(bodega: BodegaRequest): Observable<Bodega> {
    return this.http.post<Bodega>(this.apiUrl, bodega);
  }
}