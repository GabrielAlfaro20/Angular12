export class Cliente{
    pkID? : PkID_Client;
    nombre?: string;
    apellido?: string;
    dni?: string;
    telefono?:string;
    fecrea?: Date;
    direcc?:string;
}
interface PkID_Client{
    idcliente: string;
}