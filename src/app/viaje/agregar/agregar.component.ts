import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Bus } from 'src/app/Models/Buses';
import { Tripulacion } from 'src/app/Models/Tripulacion';
import { Viaje } from 'src/app/Models/Viaje';
import { BusesService } from 'src/app/services/buses.service';
import { TripulacionService } from 'src/app/services/tripulacion.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'bootstrap';
import { ViajeModule } from '../viaje.module';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnChanges{
  @Input() nuevoViaje: Viaje = new Viaje(0, '', '', '', new Date(), '', '', 0, ''); // Ajusta los valores iniciales
  @Input() tipo: boolean = false;
  busSeleccionado: Bus | undefined;
  tripulacionSeleccionado: Tripulacion | undefined;
  miForm: FormGroup;
  title!: string;
  tipoT!: string;
  description!: string;
  @ViewChild('liveToast') liveToast!: ElementRef;

  @ViewChild('radios', { read: ElementRef, static: false }) radiosRef!: ElementRef;

  ListaViaje: Viaje[] = [];
  ListaBuses: Bus[] = [];
  constructor(private fb: FormBuilder, private viajeService: ViajeService,  private busServ: BusesService, private tripulaiconServ: TripulacionService) {
    this.miForm = this.fb.group({
      codigo: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      hora: ['', Validators.required],
      fecha: ['', Validators.required],
      vehiculo: ['', Validators.required],
      tripulacion: ['', Validators.required],
      costo: ['', Validators.required],
    });
    this.busServ.getListaBuses().subscribe(buses => {
      this.ListaBuses = buses;
    });
  }

  get listBus() {
    //const bus = this.busServ.getListaBuses.filter(bus => bus.estado == 'Disponible');
    const bus = this.ListaBuses.filter(bus => bus.estado == 'Disponible');
    return bus;
  }

  get listTripulacion() {
    return this.tripulaiconServ.getListaTripulaciones;
  }

  showToast() {
    const toast = new Toast(this.liveToast.nativeElement);
    toast.show();
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1500 milisegundos = 1.5 segundos
  }

  limpiar() {
    this.miForm.reset();
    this.nuevoViaje= new Viaje(0, '', '', '', new Date(), '', '', 0, '');
    this.tipo = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.nuevoViaje.fecha === 'string') {
      this.miForm = this.fb.group({
        codigo: [this.nuevoViaje.codigo, Validators.required],
        origen: [this.nuevoViaje.origen, Validators.required],
        destino: [this.nuevoViaje.destino, Validators.required],
        hora: [this.nuevoViaje.hora, Validators.required],
        fecha: [this.nuevoViaje.fecha, Validators.required],
        vehiculo: [this.nuevoViaje.vehiculo, Validators.required],
        tripulacion: [this.nuevoViaje.tripulacion, Validators.required],
        costo: [this.nuevoViaje.costo, Validators.required],
      });
    }else {
      this.miForm = this.fb.group({
        codigo: [this.nuevoViaje.codigo, Validators.required],
        origen: [this.nuevoViaje.origen, Validators.required],
        destino: [this.nuevoViaje.destino, Validators.required],
        hora: [this.nuevoViaje.hora, Validators.required],
        fecha: [this.formatDate(this.nuevoViaje.fecha), Validators.required],
        vehiculo: [this.nuevoViaje.vehiculo, Validators.required],
        tripulacion: [this.nuevoViaje.tripulacion, Validators.required],
        costo: [this.nuevoViaje.costo, Validators.required],
      });
    }

    if (this.nuevoViaje) {
      
      const bus = this.nuevoViaje.vehiculo;
      const tripulacion = this.nuevoViaje.tripulacion;
      // this.tripulacionSeleccionado = tripulacion;
      // this.busSeleccionado = bus;
    }
  }

  busSelect(bus: Bus) {
    this.busSeleccionado = bus;
  }

  isBusSelected(bus: Bus): boolean {
    return this.busSeleccionado && this.busSeleccionado.codigo === bus.codigo ? true : false;
  }

  tripulacionSelect(tri: Tripulacion) {
    this.tripulacionSeleccionado = tri;
  }

  isTripulacionSelected(tri: Tripulacion): boolean {
    return this.tripulacionSeleccionado && this.tripulacionSeleccionado.codigo === tri.codigo ? true : false;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  metodo() {
    if (this.miForm.valid) {
      this.nuevoViaje = this.miForm.value;
      // this.nuevoViaje.codigo = this.miForm.get('codigo')?.value;
      // this.nuevoViaje.origen = this.miForm.get('origen')?.value;
      // this.nuevoViaje.destino = this.miForm.get('destino')?.value;
      // this.nuevoViaje.hora = this.miForm.get('hora')?.value;
      // this.nuevoViaje.fecha = this.miForm.get('fecha')?.value;
      if (this.ListaViaje.findIndex(viaje => viaje.codigo === this.nuevoViaje.codigo) < 0) {
        this.insertar();
        this.miForm.reset();
        this.title = 'Viajes';
        this.tipoT = 'Agregar';
        this.description = 'Viaje Agregado';
        this.showToast();
      } else {
        this.actualizar();
        this.miForm.reset();
        this.title = 'Viajes';
        this.tipoT = 'Actualizar';
        this.description = 'Viaje Actualizado';
        this.showToast();
      }
    }
  }
  
  insertar() {
    if (this.nuevoViaje.origen.trim().length === 0) {
      return;
    }
    // if (this.busSeleccionado && this.tripulacionSeleccionado) {
    //   console.log(this.nuevoViaje.vehiculo);
    //   console.log(this.busSeleccionado);
    //   this.nuevoViaje.vehiculo = this.busSeleccionado;
    //   this.nuevoViaje.tripulacion = this.tripulacionSeleccionado;
    // }
    
    // this.viajeService.AgregarViaje(this.nuevoViaje);
    // this.busServ.actualizarBusEstado(this.nuevoViaje.bus, 'En Curso');

    // this.nuevoViaje = new Viaje(0, '', '', '', new Date(), '', '', 0, ''); // Reiniciar valores después de agregar
    // this.busSeleccionado = undefined;
    // this.tripulacionSeleccionado = undefined;
    // this.tipo = false;
    // this.viajeService.getListaViaje;

    this.viajeService.AgregarViaje(this.nuevoViaje).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.nuevoViaje = {
      codigo: 0,
      origen: '',
      destino: '',
      hora: '',
      fecha: new Date(""),
      vehiculo: '',
      tripulacion: '',
      costo: 0,
      estado: ''
  };
  this.tipo = false;
}
  
  actualizar() {
    if (this.nuevoViaje.origen.trim().length === 0) {
      return;
    }
    this.viajeService.actualizarViaje(this.nuevoViaje).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.nuevoViaje = {
      codigo: 0,
      origen: '',
      destino: '',
      hora: '',
      fecha: new Date(""),
      vehiculo: '',
      tripulacion: '',
      costo: 0,
      estado: ''
  };
  this.tipo = false;
  }

  seleccionarBus(event: any) {
    const codigoBus = +event.target.value;
    this.busSeleccionado = this.listBus.find(bus => bus.codigo === codigoBus);
  }
  
  eliminarBus() {
    this.busSeleccionado = undefined;
  }

  seleccionarTripulacion(event: any) {
    const codigoTri = +event.target.value;
    this.tripulacionSeleccionado = this.listTripulacion.find(tri => tri.codigo === codigoTri);
  }
  
  eliminarTripualcion() {
    this.tripulacionSeleccionado = undefined;
  }

}
