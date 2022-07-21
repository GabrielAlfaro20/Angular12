export interface Producto {
  idProductoPro: number
  imageProp: string
  nombrePro: string
  estadoPro: boolean
  categoria: Categoria
  caracteristicas: Caracteristica[]
}

export interface Categoria {
  idcategorias: number
  nombreCate: string
}

export interface Caracteristica {
  idCaracteristica: number
  descriCaract: string
  cantidCaract: number
  precioCaract: number
}