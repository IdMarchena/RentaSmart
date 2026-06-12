import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Calificacion } from '@/types/entitys'
import type { CalificacionDto } from '@/types/dtos'
import type { CalificacionRepository } from '@/repositories/Calificacion/CalificacionRepositoryBackend'

export class BackendCalificacionRepository implements CalificacionRepository {

  // Obtener todas las calificaciones
  async getAll(): Promise<Calificacion[]> {
    const response = await http<JsonResponse<CalificacionDto[]>>('/api/calificaciones')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las calificaciones')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener una calificación por su ID
  async getById(id: number): Promise<Calificacion | null> {
    try {
      const response = await http<JsonResponse<CalificacionDto>>(`/api/calificaciones/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0] // Mapeamos el resultado
    } catch {
      return null
    }
  }

  // Crear una calificación
  async create(data: Omit<Calificacion, 'id'>): Promise<Calificacion> {
    const response = await http<JsonResponse<CalificacionDto>>('/api/calificaciones', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la calificación')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar una calificación
  async update(id: number, data: Partial<Calificacion>): Promise<Calificacion> {
    const response = await http<JsonResponse<CalificacionDto>>(`/api/calificaciones/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar la calificación')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar una calificación
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/calificaciones/${id}`, {
      method: 'DELETE',
    })
  }

  // Filtro de calificaciones por servicio
  async getByServicioId(idServicio: number): Promise<Calificacion[]> {
    const response = await http<JsonResponse<CalificacionDto[]>>(`/api/calificaciones/por-servicio/${idServicio}`)

    if (!response.success || !response.data) return []

    return this.mapToEntity(response.data)
  }

  // Filtro de calificaciones por publicación
  async getByPublicacionId(idPublicacion: number): Promise<Calificacion[]> {
    try {
      const response = await http<JsonResponse<CalificacionDto[]>>(`/api/calificaciones/por-publicacion/${idPublicacion}`)

      if (!response.success || !response.data) return []

      return this.mapToEntity(response.data)
    } catch (error) {
      console.log(`No se encontraron calificaciones para la publicación ${idPublicacion}:`, error)
      return []
    }
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: CalificacionDto[]): Calificacion[] {
    return dtos.map(dto => ({
      id: dto.id,
      puntaje: dto.puntaje,
      comentario: dto.comentario,
      fecha: dto.fecha,
      // En Entity van las relaciones completas
      usuario: { id: dto.idUsuarioPostulante } as any, // Referencia a Usuario
      publicacion: { id: dto.idPublicacion } as any,   // Referencia a Publicacion
      servicio: { id: dto.idServicio } as any,       // Referencia a Servicio
    }))
  }

// En BackendCalificacionRepository.ts

private mapToDto(entity: any): any {
  return {
    puntaje: entity.puntaje,
    comentario: entity.comentario,
    fecha: entity.fecha || new Date().toISOString(),
    idUsuarioPostulante: entity.idUsuarioPostulante || entity.usuario?.id,
    idPublicacion: entity.idPublicacion || entity.publicacion?.id,
    idServicio: entity.idServicio || entity.servicio?.id,
  };
}
}
