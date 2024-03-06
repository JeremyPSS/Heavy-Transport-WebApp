import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'bootstrap';
import { Bus } from 'src/app/Models/Buses';
import { Mantenimiento } from 'src/app/Models/Mantenimiento';
import { BusesService } from 'src/app/services/buses.service';
import { MantenimientoService } from 'src/app/services/mantenimiento.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnChanges {

  @Input() Nuevo: Mantenimiento = {
    codigo: 0,
    fecha: new Date(""),
    kilometraje: 0,
    costo: 0,
    tipo: '',
    vehiculo: ''
  };
  @Input() tipo: boolean = false;
  manteForm: FormGroup;
  title!: string;
  tipoT!: string;
  description!: string;
  busSeleccionado: Bus | undefined;
  ListaBuses: Bus[] = [];
  @ViewChild('liveToast') liveToast!: ElementRef;

  ListaChoferes: Mantenimiento[] = [];
  constructor(private fb: FormBuilder, private manteService: MantenimientoService, private busServ: BusesService) {
    this.manteForm = this.fb.group({
      codigo: ['', Validators.required],
      fecha: ['', Validators.required],
      kilometraje: ['', Validators.required],
      costo: ['', Validators.required],
      tipo: ['', Validators.required],
      vehiculo: ['', Validators.required],
    });
    this.busServ.getListaBuses().subscribe(buses => {
      this.ListaBuses = buses;
    });
  }

  showToast() {
    const toast = new Toast(this.liveToast.nativeElement);
    toast.show();
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1500 milisegundos = 1.5 segundos
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.Nuevo.fecha === 'string') {
      this.manteForm = this.fb.group({
        codigo: [this.Nuevo.codigo, Validators.required],
        fecha: [this.Nuevo.fecha, Validators.required],
        kilometraje: [this.Nuevo.kilometraje, Validators.required],
        costo: [this.Nuevo.costo, Validators.required],
        tipo: [this.Nuevo.tipo, Validators.required],
        vehiculo: [this.Nuevo.vehiculo, Validators.required],
      });
    } else {
      this.manteForm = this.fb.group({
        codigo: [this.Nuevo.codigo, Validators.required],
        fecha: [this.formatDate(this.Nuevo.fecha), Validators.required],
        kilometraje: [this.Nuevo.kilometraje, Validators.required],
        costo: [this.Nuevo.costo, Validators.required],
        tipo: [this.Nuevo.tipo, Validators.required],
        vehiculo: [this.Nuevo.vehiculo, Validators.required],
      });
    }

    if (this.Nuevo) {
      
      const bus = this.Nuevo.vehiculo; 
      //this.busSeleccionado = bus;
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  get listBus() {
    //const bus = this.busServ.getListaBuses.filter(bus => bus.estado == 'Disponible');
    const bus = this.ListaBuses.filter(bus => bus.estado == 'Disponible');
    return bus;
  }

  busSelect(bus: Bus) {
    this.busSeleccionado = bus;
  }

  isBusSelected(bus: Bus): boolean {
    return this.busSeleccionado && this.busSeleccionado.codigo === bus.codigo ? true : false;
  }

  metodo() {
    if (this.manteForm.valid) {
      this.Nuevo = this.manteForm.value;
      // if (this.choferService.getListaChoferes.findIndex(chofer => chofer.codigo === this.Nuevo.codigo) < 0) {
      if (this.ListaChoferes.findIndex(manteimiento => manteimiento.codigo === this.Nuevo.codigo) < 0) {
        this.Insert();
        this.manteForm.reset();
        this.title = 'Mantenimiento';
        this.tipoT = 'Agregar';
        this.description =  'Mantenimiento Agregado';
        this.showToast();
      } else {
        this.Actualizar();
        this.manteForm.reset();
        this.title = 'Mantenimiento';
        this.tipoT = 'Actualizar';
        this.description =  'Mantenimiento Actualizado';
        this.showToast();
      }
    }
  }

  limpiar() {
    this.manteForm.reset();
    this.Nuevo= {
      codigo: 0,
      fecha: new Date(""),
      kilometraje: 0,
      costo: 0,
      tipo: '',
      vehiculo: ''
    };
    this.tipo = false;
  }

  Insert() {
    if (this.Nuevo.tipo.trim().length === 0) {
      return;
    }

    this.manteService.AgregarMantenimiento(this.Nuevo).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.Nuevo = {
      codigo: 0,
      fecha: new Date(""),
      kilometraje: 0,
      costo: 0,
      tipo: '',
      vehiculo: ''
    };
    this.tipo = false;
  }

  Actualizar() {
    if (this.Nuevo.tipo.trim().length === 0) {
      return;
    }

    this.manteService.actualizarMantenimiento(this.Nuevo).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.Nuevo = {
      codigo: 0,
      fecha: new Date(""),
      kilometraje: 0,
      costo: 0,
      tipo: '',
      vehiculo: ''
    };
    this.tipo = false;
  }

}
