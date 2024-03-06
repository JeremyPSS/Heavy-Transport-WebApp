import { Injectable } from '@angular/core';
import { Bus } from '../Models/Buses';
// import { Tripulacion } from '../Models/Tripulacion';
// import { Chofer } from '../Models/Chofer';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusesService {

  private ListaBuses: Bus[] = [
    new Bus(1, "NGH-1548", "Urbano", "Mantenimiento", 1),
    new Bus(2, "XDH-1686", "Provincial", "Disponible", 0),
    new Bus(3, "ASD-9863", "Provincial", "Disponible", 3),
    new Bus(4, "ZXC-9561", "Provincial", "Disponible", 5),
    new Bus(5, "ERT-3256", "Urbano", "Mantenimiento", 2)
  ];

  private apiUrl = 'http://localhost:3800/api/bus';

  //constructor() { }
  constructor(private http: HttpClient) { }

  // get getListaBuses(): Bus[] {
  //   return [...this.ListaBuses];
  // }

  getListaBuses(): Observable<Bus[]> {
    return this.http.get<Bus[]>(this.apiUrl);
  }
  
  // AgregarBus(bus: Bus) {
  //   this.ListaBuses.push(bus);
  // }

  AgregarBus(bus: Bus): Observable<Bus> {
    return this.http.post<Bus>(this.apiUrl, bus)
    // .pipe(
    //   tap((response:Bus) => {
    //     console.log('Response from API: ',response);
    //   })
    // )
    ;
  }

  // actualizarBus(bus: Bus) {
  //   const indice = this.ListaBuses.findIndex(b => b.codigo === bus.codigo);
  //   if (indice !== -1) {
  //     this.ListaBuses[indice] = bus;
  //   }
  // }


  actualizarBus(bus: Bus): Observable<Bus> {
    const url = `${this.apiUrl}/${bus.codigo}`;
    return this.http.put<Bus>(url, bus);
  }

  actualizarBusViajes(bus: Bus) {
    const indice = this.ListaBuses.findIndex(b => b.codigo === bus.codigo);
    if (indice !== -1) {
      this.ListaBuses[indice].num_viajes += 1;
    }
  }

  actualizarBusEstado(bus: Bus, estado: string) {
    const indice = this.ListaBuses.findIndex(b => b.codigo === bus.codigo);
    if (indice !== -1) {
      this.ListaBuses[indice].estado = estado;
    }
  }

  // eliminarBus(bus: Bus) {
  //   const indice = this.ListaBuses.indexOf(bus);
  //   if (indice !== -1) {
  //     this.ListaBuses.splice(indice, 1);
  //   }
  // }

  eliminarBus(bus: Bus): Observable<Bus> {
    const url = `${this.apiUrl}/${bus.codigo}`;
    return this.http.delete<Bus>(url);
  }

}
