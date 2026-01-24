import type { Multimedia } from '@/types/entitys'

export interface MultimediaRepository {
  getAll(): Promise<Multimedia[]>
  getById(id: number): Promise<Multimedia | null>
  create(data: Omit<Multimedia, 'id'>): Promise<Multimedia>
  update(id: number, data: Partial<Multimedia>): Promise<Multimedia>
  delete(id: number): Promise<void>
  
  // Filtros especializados
  getByPublicacion(publicacionId: number): Promise<Multimedia[]>
  getByTipo(tipo: string): Promise<Multimedia[]>
}
