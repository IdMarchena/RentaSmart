  import type { Inmueble } from '@/types/entitys'

  export interface InmuebleRepository {
    getAll(): Promise<Inmueble[]>
    getById(id: number): Promise<Inmueble | null>
    create(data: Omit<Inmueble, 'id'>): Promise<Inmueble>
    update(id: number, data: Partial<Inmueble>): Promise<Inmueble>
    delete(id: number): Promise<void>
    
    // Filtros especializados
    getByUbicacion(id: number): Promise<Inmueble[]>
    getByEstado(estado: string): Promise<Inmueble[]>
    getByNombre(nombre: string): Promise<Inmueble[]>
    getByEstrato(estrato: number): Promise<Inmueble[]>
    getByTipo(tipo: string): Promise<Inmueble[]>
    
    // Acciones
    cambiarEstado(id: number, estado: string): Promise<void>
  }
