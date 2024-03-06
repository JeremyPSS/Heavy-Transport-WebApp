import { Component } from '@angular/core';
import { BusesService } from '../services/buses.service';
import { ViajeService } from '../services/viaje.service';
import { Bus } from '../Models/Buses';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent {
  buscarPlaca: string = '';
  ListaBusesA: Bus[] = [];
  constructor(private busService: BusesService, private viajesServ: ViajeService) {
    this.busService.getListaBuses().subscribe(buses => {
      this.ListaBusesA = buses;
    });
   }
  
  get ListaBuses() {
    //return this.busService.getListaBuses;
    return this.ListaBusesA;
  }

  filtrarPorPlaca() {
    return this.ListaBuses.filter((bus) =>
      bus.placa.toLowerCase().includes(this.buscarPlaca.toLowerCase())
    );
  }

  numViajes(): Observable<number> {
    // const numviajes = this.viajesServ.getListaViaje.filter(viaje => viaje.estado === 'Arrivado').length;
  
    // return numviajes;

    const numviajes = this.viajesServ.getListaViaje().pipe(
      map(viajes => viajes.filter(viaje => viaje.estado === 'Arrivado').length)
    );

    return numviajes;
  }
  
  calcularPromedio(num: number): Observable<string> {
    // const numviajes = this.viajesServ.getListaViaje().pipe(
    //   map(viajes => viajes.filter(viaje => viaje.estado === 'Arrivado').length)
    // );
    // const promedio = num / numviajes * 100;
  
    // if (isNaN(promedio) || promedio < 0 || !isFinite(promedio)) {
    //   return '';
    // }
  
    // return promedio.toFixed(2);

    return this.viajesServ.getListaViaje().pipe(
      map(viajes => {
        const numviajes = viajes.filter(viaje => viaje.estado === 'Arrivado').length;
        const promedio = num / numviajes * 100;
  
        if (isNaN(promedio) || promedio < 0 || !isFinite(promedio)) {
          return '';
        }
  
        return promedio.toFixed(2);
      })
    );
  }
  
}
