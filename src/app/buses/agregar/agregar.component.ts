import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bus } from 'src/app/Models/Buses';
import { BusesService } from 'src/app/services/buses.service';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnChanges{
  @Input() Nuevo: Bus = new Bus(0, '', '', '',0); // Ajusta los valores iniciales
  @Input() tipo: boolean = false;
  miFormulario: FormGroup;
  title!: string;
  tipoT!: string;
  description!: string;
  @ViewChild('liveToast') liveToast!: ElementRef;

  ListaBuses: Bus[] = [];
  
  constructor(private fb: FormBuilder, private busService: BusesService) {
    this.miFormulario = this.fb.group({
      codigo: ['', Validators.required],
      placa: ['', Validators.required],
      tipo: ['', Validators.required],
      estado: ['', Validators.required],
    });
    this.busService.getListaBuses().subscribe(buses => {
      this.ListaBuses = buses;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.miFormulario.patchValue({
      codigo: this.Nuevo.codigo,
      placa: this.Nuevo.placa,
      tipo: this.Nuevo.tipo,
      estado: this.Nuevo.estado,
    });
  }
  
  showToast() {
    const toast = new Toast(this.liveToast.nativeElement);
    toast.show();
    setTimeout(() => {
      window.location.reload();
    }, 1500); // 1500 milisegundos = 1.5 segundos
  }

  metodo() {
    if (this.miFormulario.valid) {
      const viajes = this.Nuevo.num_viajes;
      this.Nuevo = this.miFormulario.value;
      this.Nuevo.num_viajes = viajes;
      //if (this.busService.getListaBuses.findIndex(bus => bus.codigo === this.Nuevo.codigo) < 0) {
      if (this.ListaBuses.findIndex(bus => bus.codigo === this.Nuevo.codigo) < 0) {
        this.insertar();
        this.miFormulario.reset();
        this.title = 'Buses';
        this.tipoT = 'Agregar';
        this.description = 'Bus Agregado';
        this.showToast();
      } else {
        this.actualizar();
        this.miFormulario.reset();
        this.title = 'Buses';
        this.tipoT = 'Actualizar';
        this.description = 'Bus Actualizado';
        this.showToast();
      }
    }    
  }
  
  limpiar() {
    this.miFormulario.reset();
    this.Nuevo= new Bus(0, '', '', '',0);
    this.tipo = false;
  }

  insertar() {
    if (this.Nuevo.placa.trim().length === 0) {
      return;
    }
  
    //this.busService.AgregarBus(this.Nuevo);
    this.busService.AgregarBus(this.Nuevo).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.Nuevo = new Bus(0, '', '', '',0); // Reiniciar valores después de agregar
    this.tipo = false;
  }
  
  actualizar() {
    if (this.Nuevo.placa.trim().length === 0) {
      return;
    }
  
    this.busService.actualizarBus(this.Nuevo).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      },
      error => {
        console.error('Error en la solicitud:', error);
      }
    );
    this.Nuevo = new Bus(0, '', '', '',0); // Reiniciar valores después de actualizar
    this.tipo = false;
  }
}
