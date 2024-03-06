import { Bus } from "./Buses";

export class Mantenimiento {
    codigo: number;
    fecha: Date;
    kilometraje: number;
    costo: number;
    tipo: string;
    vehiculo: string;
    
    constructor(cd: number, fch: Date, km: number, cos: number, tp: string, vh: string){
        this.codigo = cd;
        this.fecha = fch;
        this.kilometraje = km;
        this.costo = cos;
        this.tipo = tp;
        this.vehiculo = vh;
    }


}