export interface Roles {
  idrol:    number;
  rol:      string;
  usuarios: UsuariosList[];
}

export interface UsuariosList {
  idusuarios: number;
  correo:     string;
  clave:      string;
  fecrea:     Date;
  roles?:     Roles;
}
