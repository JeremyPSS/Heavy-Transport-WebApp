import { Component, ElementRef, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';
import { Bus } from 'src/app/Models/Buses';
import { Mantenimiento } from 'src/app/Models/Mantenimiento';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent {

  update!: boolean;
  newchofer: Mantenimiento = {
    codigo: 8,
    fecha: new Date('2024-02-21'),
    kilometraje: 25000,
    costo: 250,
    tipo: 'Cambio de pieza',
    // vehiculo: new Bus(2, "XDH-1686", "Provincial", "Disponible", 0)
    vehiculo: 'XDH-1686'
  };
  title!: string;
  tipoT!: string;
  description!: string;
  @ViewChild('liveToast') liveToast!: ElementRef;
  
  get ListaMantenimiento() {
    // return this.choferService.getListaChoferes;
    return this.ListaChoferesA;
  }
  
  ListaChoferesA: Mantenimiento[] = [];
  constructor(private manteService: MantenimientoService) { 
    this.manteService.getListaMantenimiento().subscribe(mantenimiento => {
      this.ListaChoferesA = mantenimiento;
      console.log('Mantenimientos obtenidos:', this.ListaChoferesA);
    },
    (error) => {
      console.error('Error al obtener mantenimientos:', error);
    }
    
    );
  }
  
  ngOnInit() {
    this.update = false;
  }
  
  showToast() {
    const toast = new Toast(this.liveToast.nativeElement);
    toast.show();
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1500 milisegundos = 1.5 segundos
  }
  
  editarChofer(mante: Mantenimiento) {
    this.update = true;
    this.newchofer = { ...mante };
  }
  
  eliminarChofer(mante: Mantenimiento) {
    this.manteService.eliminarMantenimiento(mante).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.title = 'Mantenimiento';
    this.tipoT = 'Eliminar';
    this.description = 'Mantenimiento Eliminado';
    this.showToast();
  }

}
