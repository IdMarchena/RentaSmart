import type { Calificacion } from '@/types/entitys'

export interface CalificacionRepository {
  getAll(): Promise<Calificacion[]>
  getById(id: number): Promise<Calificacion | null>
  create(data: Omit<Calificacion, 'id'>): Promise<Calificacion>
  update(id: number, data: Partial<Calificacion>): Promise<Calificacion>
  delete(id: number): Promise<void>
  
  getByServicioId(idServicio: number): Promise<Calificacion[]>
  getByPublicacionId(idPublicacion: number): Promise<Calificacion[]>
}
