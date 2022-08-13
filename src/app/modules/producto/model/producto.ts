//
export interface Producto {
  idProductoPro?: number
  imageProp: string
  nombrePro: string//
  estadoPro: string//
  categoria?: Categoria//
  caracteristicas?: Caracteristica[]
}
//2
export interface Categoria {
  idcategorias: string,
  nombreCate?: string
}
//1
export interface Caracteristica {
  idCaracteristica?: number
  descriCaract: string
  cantidCaract: number
  precioCaract: number
}
