import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Favorito } from '@/types/entitys'
import type { FavoritoDto } from '@/types/dtos'
import type { FavoritoRepository } from './FavoritoRepository'

export class BackendFavoritoRepository implements FavoritoRepository {

  // Obtener todos los favoritos
  async getAll(): Promise<Favorito[]> {
    const response = await http<JsonResponse<FavoritoDto[]>>('/api/favoritos')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los favoritos')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener un favorito por ID
  async getById(id: number): Promise<Favorito | null> {
    try {
      const response = await http<JsonResponse<FavoritoDto>>(`/api/favoritos/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear un favorito
  async create(data: Omit<Favorito, 'id'>): Promise<Favorito> {
    const response = await http<JsonResponse<FavoritoDto>>('/api/favoritos', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear el favorito')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar un favorito
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/favoritos/${id}`, {
      method: 'DELETE',
    })
  }

  // Obtener favoritos por ID de usuario
  async getByUsuarioId(idUsuario: number): Promise<Favorito[]> {
    const response = await http<JsonResponse<FavoritoDto[]>>(`/api/favoritos/usuario/${idUsuario}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: FavoritoDto[]): Favorito[] {
    return dtos.map(dto => ({
      id: dto.id,
      usuario: { id: dto.idUsuario } as any,  // Relacionado con Usuario
      publicacion: { id: dto.idPublicacion } as any, // Relacionado con Publicación
      fechaCreacion: dto.fechaCreacion,
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: Partial<Favorito>): FavoritoDto {
    return {
      id: entity.id || 0,
      idUsuario: typeof entity.usuario === 'number' 
      ? entity.usuario : (entity.usuario as any)?.id || 0,
      idPublicacion: typeof entity.publicacion === 'number' ? entity.publicacion : entity.publicacion?.id || 0,
      fechaCreacion: entity.fechaCreacion!,
    }
  }
}
