import { Bus } from "./Buses";
import { Tripulacion } from "./Tripulacion";

export class Viaje {
    codigo: number;
    origen: string;
    destino: string;
    hora: string;
    fecha: Date;
    vehiculo: string;
    tripulacion: string;
    costo: number
    estado: string;
    constructor(codigo: number, origen: string, destino: string, hora: string, fecha: Date, veh: string, tripulacion: string, costo: number, estado: string) {
        this.codigo = codigo;
        this.origen = origen;
        this.destino = destino;
        this.hora = hora;
        this.fecha = fecha;
        this.vehiculo = veh;
        this.tripulacion = tripulacion;
        this.costo = costo;
        this.estado = estado;
    }
}