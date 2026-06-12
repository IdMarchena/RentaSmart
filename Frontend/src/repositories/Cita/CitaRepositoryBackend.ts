import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Cita } from '@/types/entitys'
import type { CitaDto } from '@/types/dtos'
import type { CitaRepository } from './CitaRepository'

export class BackendCitaRepository implements CitaRepository {

  // Obtener todas las citas
  async getAll(): Promise<Cita[]> {
    const response = await http<JsonResponse<CitaDto[]>>('/api/citas')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las citas')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener una cita por su ID
  async getById(id: number): Promise<Cita | null> {
    try {
      const response = await http<JsonResponse<CitaDto>>(`/api/citas/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear una cita
  async create(data: Omit<Cita, 'id'>): Promise<Cita> {
    const response = await http<JsonResponse<CitaDto>>('/api/citas', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la cita')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar una cita
  async update(id: number, data: Partial<Cita>): Promise<Cita> {
    const response = await http<JsonResponse<CitaDto>>(`/api/citas/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar la cita')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar una cita
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/citas/${id}`, {
      method: 'DELETE',
    })
  }

  // Obtener citas por ID de usuario
  async getByUsuarioId(idUsuario: number): Promise<Cita[]> {
    const response = await http<JsonResponse<CitaDto[]>>(`/api/citas/por-usuario/${idUsuario}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener citas por ID de servicio
  async getByServicioId(idServicio: number): Promise<Cita[]> {
    const response = await http<JsonResponse<CitaDto[]>>(`/api/citas/por-servicio/${idServicio}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener citas por ID de publicación
  async getByPublicacionId(idPublicacion: number): Promise<Cita[]> {
    const response = await http<JsonResponse<CitaDto[]>>(`/api/citas/por-publicacion/${idPublicacion}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener citas por estado
  async getByEstado(estado: string): Promise<Cita[]> {
    const response = await http<JsonResponse<CitaDto[]>>(`/api/citas/por-estado?estado=${estado}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener citas por fecha
  async getByFecha(fecha: string): Promise<Cita[]> {
    const response = await http<JsonResponse<CitaDto[]>>(`/api/citas/por-fecha?fecha=${fecha}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: CitaDto[]): Cita[] {
    return dtos.map(dto => ({
      id: dto.id,
      fecha: dto.fecha,
      estado: dto.estado,
      // Mapeamos las relaciones de usuario, servicio y publicación
      usuario: { id: dto.idUsuarioCita } as any,
      usuarioRemitente: { id: dto.idUsuarioRemitente } as any,
      servicio: { id: dto.idServicio } as any,
      publicacion: { id: dto.idPublicacion } as any,
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: Partial<Cita>): CitaDto {
    return {
      id: entity.id || 0,
      fecha: entity.fecha!,
      estado: entity.estado!,
      idUsuarioCita: typeof entity.usuario === 'number' 
        ? entity.usuario 
        : (entity.usuario as any)?.id || 0,
      idUsuarioRemitente: typeof entity.usuarioRemitente === 'number' 
        ? entity.usuarioRemitente 
        : (entity.usuarioRemitente as any)?.id || 0,
      idServicio: typeof entity.servicio === 'number' 
        ? entity.servicio 
        : (entity.servicio as any)?.id || 0,
      idPublicacion: typeof entity.publicacion === 'number' 
        ? entity.publicacion 
        : (entity.publicacion as any)?.id || 0,
    }
  }
}
