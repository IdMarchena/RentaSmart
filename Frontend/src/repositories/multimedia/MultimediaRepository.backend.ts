import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Multimedia } from '@/types/entitys'
import type { MultimediaRepository } from './MultimediaRepository'

export class BackendMultimediaRepository implements MultimediaRepository {
  async getAll(): Promise<Multimedia[]> {
    const response = await http<JsonResponse<Multimedia[]>>('/api/v1/multimedias')
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener multimedias')
    }

    return response.data
  }

  async getById(id: number): Promise<Multimedia | null> {
    try {
      const response = await http<JsonResponse<Multimedia>>(`/api/v1/multimedias/${id}`)
      
      if (!response.success || !response.data) {
        return null
      }

      return response.data
    } catch {
      return null
    }
  }

  async create(data: Omit<Multimedia, 'id'>): Promise<Multimedia> {
    const response = await http<JsonResponse<Multimedia>>('/api/v1/multimedias', {
      method: 'POST',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear multimedia')
    }

    return response.data
  }

  async update(id: number, data: Partial<Multimedia>): Promise<Multimedia> {
    const response = await http<JsonResponse<Multimedia>>(`/api/v1/multimedias/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar multimedia')
    }

    return response.data
  }

  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/multimedias/${id}`, {
      method: 'DELETE'
    })
  }

  async getByPublicacion(publicacionId: number): Promise<Multimedia[]> {
    try {
      const response = await http<JsonResponse<Multimedia[]>>(
        `/api/v1/multimedias/publicacion/${publicacionId}`
      )
      
      if (!response.success || !response.data) return []
      return response.data
    } catch (error) {
      console.log(`No se encontraron multimedias para la publicación ${publicacionId}:`, error)
      return []
    }
  }

  async getByTipo(tipo: string): Promise<Multimedia[]> {
    const response = await http<JsonResponse<Multimedia[]>>(
      `/api/v1/multimedias/tipo/${encodeURIComponent(tipo)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  private mapToDto(entity: Partial<Multimedia>): any {
    return {
      url: entity.url,
      tipo: entity.tipo,
      idPublicacion: entity.idPublicacion,
      orden: entity.orden
    }
  }
}
