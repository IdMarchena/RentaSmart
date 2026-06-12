import type { Favorito } from '@/types/entitys'

export interface FavoritoRepository {
  getAll(): Promise<Favorito[]>
  getById(id: number): Promise<Favorito | null>
  create(data: Omit<Favorito, 'id'>): Promise<Favorito>
  delete(id: number): Promise<void>

  getByUsuarioId(idUsuario: number): Promise<Favorito[]>
}
