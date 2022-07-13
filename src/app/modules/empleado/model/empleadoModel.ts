export class Empleado{
    pkID? : PkID_Emple;
    nombresEml?: string;
    apellidosEmpl?: string;
    dniEml?:string;
    correoEmpl?:string;
    passwordEmpl?:string;
    rolEmpl?: string;
    estadoEmpl?: string;

}

interface PkID_Emple{
    idEmpleado: string;
}