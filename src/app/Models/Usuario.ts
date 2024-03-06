export class Usuario {
    id:string;
    nombre:string;
    apellido:string;
    correo:string;
    contrasenia:string;

    constructor(id:string, nom:string, ape:string, ema:string,cont:string){
        this.id=id;
        this.nombre=nom;
        this.apellido=ape;
        this.correo=ema;
        this.contrasenia=cont;
    }
    
}