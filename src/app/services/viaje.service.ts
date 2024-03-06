import { Injectable } from '@angular/core';
import { Viaje } from '../Models/Viaje';
import { Bus } from '../Models/Buses';
import { Tripulacion } from '../Models/Tripulacion';
import { Chofer } from '../Models/Chofer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private ListaViajes: Viaje[] = [
    new Viaje(1, "Quito", "Cuenca", "10:00", new Date("2023-08-31"), 'ZXC-9561', '1', 40, 'Arrivado'),
    new Viaje(2, "Ambato", "Macará", "11:00", new Date("2023-09-01"), 'ZXC-9561', '2', 28, 'Arrivado'),
    new Viaje(3, "Pasaje", "Manta", "12:00", new Date("2023-09-02"), 'ASD-9863', '3', 30, 'Arrivado'),
  ];

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3800/api/viaje';

  getListaViaje(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.apiUrl);
  }

  AgregarViaje(viaje: Viaje): Observable<Viaje> {
    return this.http.post<Viaje>(this.apiUrl, viaje);
  }

  actualizarViaje(viaje: Viaje): Observable<Viaje> {
    const url = `${this.apiUrl}/${viaje.codigo}`;
    return this.http.put<Viaje>(url, viaje);
  }

  eliminarViaje(viaje: Viaje): Observable<Viaje> {
    const url = `${this.apiUrl}/${viaje.codigo}`;
    return this.http.delete<Viaje>(url);
  }

  actualizarViajesEstado(viaje: Viaje, estado: string) {
    const indice = this.ListaViajes.findIndex(v => v.codigo === viaje.codigo);
    if (indice !== -1) {
      this.ListaViajes[indice].estado = estado;
    }
  }
}
