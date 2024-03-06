import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mantenimiento } from '../Models/Mantenimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3800/api/mante';

  getListaMantenimiento(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.apiUrl);
  }

  AgregarMantenimiento(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    return this.http.post<Mantenimiento>(this.apiUrl, mantenimiento);
  }

  actualizarMantenimiento(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = `${this.apiUrl}/${mantenimiento.codigo}`;
    return this.http.put<Mantenimiento>(url, mantenimiento);
  }

  eliminarMantenimiento(mantenimiento: Mantenimiento): Observable<Mantenimiento> {
    const url = `${this.apiUrl}/${mantenimiento.codigo}`;
    return this.http.delete<Mantenimiento>(url);
  }
}
