import type { Ubicacion } from '@/types/entitys'

export interface UbicacionRepository {
  getAll(): Promise<Ubicacion[]>
  getById(id: number): Promise<Ubicacion | null>
  create(data: Omit<Ubicacion, 'id'>): Promise<Ubicacion>
  update(id: number, data: Omit<Ubicacion, 'id'>): Promise<Ubicacion>
  delete(id: number): Promise<void>
  getByEstado(estado: string): Promise<Ubicacion[]>
}
