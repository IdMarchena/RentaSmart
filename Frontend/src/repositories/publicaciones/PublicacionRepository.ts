import type { Publicacion } from '@/types/entitys'

export interface PublicacionFilters {
  estado?: string
  titulo?: string
  precioMin?: number
  precioMax?: number
  nombreInmueble?: string
  ubicacion?: string
  estrato?: string
  ubicacionId?: number
  nombre?: string
  arrendatarioId?: number
  usuarioId?: number
}

export interface PublicacionRepository {
  getAll(): Promise<Publicacion[]>
  getById(id: number): Promise<Publicacion | null>
  create(data: Omit<Publicacion, 'id'>): Promise<Publicacion>
  update(id: number, data: Partial<Publicacion>): Promise<Publicacion>
  delete(id: number): Promise<void>
  
  // Filtros especializados
  getByEstado(estado: string): Promise<Publicacion[]>
  getByTitulo(titulo: string): Promise<Publicacion[]>
  getByPrecioMenor(precio: number): Promise<Publicacion[]>
  getByPrecioMayor(precio: number): Promise<Publicacion[]>
  getByPrecioRango(precioMin: number, precioMax: number): Promise<Publicacion[]>
  getByNombreInmueble(nombre: string): Promise<Publicacion[]>
  getByUbicacionInmueble(ubicacion: string): Promise<Publicacion[]>
  getByEstratoInmueble(estrato: string): Promise<Publicacion[]>
  getByUbicacionYEstado(ubicacionId: number, estado: string): Promise<Publicacion[]>
  getByNombreYEstrato(nombre: string, estrato: number): Promise<Publicacion[]>
  getByIdArrendatario(id: number): Promise<Publicacion[]>
  getByIdUsuario(id: number): Promise<Publicacion[]>
  getTop6(): Promise<Publicacion[]>
  getByTipoInmueble(tipo: string): Promise<Publicacion[]>
  getByUbicacion(ubicacion: string): Promise<Publicacion[]>
  getByEstrato(estrato: string): Promise<Publicacion[]>
  
  cambiarEstado(id: number, estado: string): Promise<void>
}
