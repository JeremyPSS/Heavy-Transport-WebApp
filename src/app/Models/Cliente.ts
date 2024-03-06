export class Cliente{
    codigo:number;
    nombre:string;
    apellido:string;
    email:string
    contrasenia:string;

    constructor(cod:number, nom:string, ape:string, ema:string,cont:string){
        this.codigo=cod;
        this.nombre=nom;
        this.apellido=ape;
        this.email=ema;
        this.contrasenia=cont;
    }
}