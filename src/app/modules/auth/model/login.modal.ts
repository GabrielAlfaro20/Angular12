export interface Usuarios {
    idusuarios: number;
    correo: string;
    clave: string;
    nombre: string;
    apellido: string;
    fecrea: Date;
    roles: Roles;
}
export interface Roles {
    idrol: number;
    tipuser: string;
}

