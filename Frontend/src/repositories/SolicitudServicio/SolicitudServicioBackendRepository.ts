import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { SolicitudServicioDto } from '@/types/dtos'
import type { SolicitudServicio } from '@/types/entitys'
import type { SolicitudServicioRepository } from './SolicitudServicioRepository'

export class BackendSolicitudServicioRepository implements SolicitudServicioRepository {

  // Crear una solicitud de servicio
  async create(data: Omit<SolicitudServicio, 'id'>): Promise<SolicitudServicio> {
    const response = await http<JsonResponse<SolicitudServicioDto>>('/api/solicitudesServicio', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la solicitud de servicio')
    }

    return this.mapToSingleEntity(response.data)
  }

  // Obtener solicitud por ID
  async getById(id: number): Promise<SolicitudServicio | null> {
    try {
      const response = await http<JsonResponse<SolicitudServicioDto>>(`/api/solicitudesServicio/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToSingleEntity(response.data)
    } catch {
      return null
    }
  }

  // Actualizar solicitud de servicio
  async update(id: number, data: Omit<SolicitudServicio, 'id'>): Promise<SolicitudServicio> {
    const response = await http<JsonResponse<SolicitudServicioDto>>(`/api/solicitudesServicio/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar la solicitud de servicio')
    }

    return this.mapToSingleEntity(response.data)
  }

  // Obtener todas las solicitudes de servicio
  async getAll(): Promise<SolicitudServicio[]> {
    const response = await http<JsonResponse<SolicitudServicioDto[]>>('/api/solicitudesServicio')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las solicitudes de servicio')
    }

    return this.mapToEntity(response.data)
  }

  // Filtrar por usuario
  async getByUsuario(idUsuario: number): Promise<SolicitudServicio[]> {
    const response = await http<JsonResponse<SolicitudServicioDto[]>>(`/api/solicitudesServicio/usuario/${idUsuario}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener solicitudes de servicio por usuario')
    }

    return this.mapToEntity(response.data)
  }

  // Filtrar por estado
  async getByEstado(estado: string): Promise<SolicitudServicio[]> {
    const response = await http<JsonResponse<SolicitudServicioDto[]>>(`/api/solicitudesServicio/estado/${estado}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener solicitudes de servicio por estado')
    }

    return this.mapToEntity(response.data)
  }

  // Filtrar por servicio
  async getByServicio(idServicio: number): Promise<SolicitudServicio[]> {
    const response = await http<JsonResponse<SolicitudServicioDto[]>>(`/api/solicitudesServicio/servicio/${idServicio}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener solicitudes de servicio por servicio')
    }

    return this.mapToEntity(response.data)
  }

  // Filtrar por inmueble
  async getByInmueble(idInmueble: number): Promise<SolicitudServicio[]> {
    const response = await http<JsonResponse<SolicitudServicioDto[]>>(`/api/solicitudesServicio/inmueble/${idInmueble}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener solicitudes de servicio por inmueble')
    }

    return this.mapToEntity(response.data)
  }

  // Filtrar por fecha entre
  async getByFechaBetween(startDate: string, endDate: string): Promise<SolicitudServicio[]> {
    const response = await http<JsonResponse<SolicitudServicioDto[]>>(`/api/solicitudesServicio/fecha?startDate=${startDate}&endDate=${endDate}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener solicitudes de servicio por fecha')
    }

    return this.mapToEntity(response.data)
  }

  // Eliminar solicitud de servicio
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/solicitudesServicio/${id}`, {
      method: 'DELETE',
    })
  }

  // Mapeo de DTO a Entity (para arrays)
  private mapToEntity(dtos: SolicitudServicioDto[]): SolicitudServicio[] {
    return dtos.map(dto => ({
      id: dto.id,
      servicio: { id: dto.idServicio } as any, // Referencia al servicio
      usuario: { id: dto.idUsuario } as any, // Referencia al usuario
      inmueble: { id: dto.idInmueble } as any, // Referencia al inmueble
      fecha: dto.fecha,
      estado: dto.estado,
      descripcionProblema: dto.descripcionProblema
    }))
  }

  // Mapeo de DTO a Entity (para un solo elemento)
  private mapToSingleEntity(dto: SolicitudServicioDto): SolicitudServicio {
    return {
      id: dto.id,
      servicio: { id: dto.idServicio } as any, // Referencia al servicio
      usuario: { id: dto.idUsuario } as any, // Referencia al usuario
      inmueble: { id: dto.idInmueble } as any, // Referencia al inmueble
      fecha: dto.fecha,
      estado: dto.estado,
      descripcionProblema: dto.descripcionProblema
    }
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: Partial<SolicitudServicio>): SolicitudServicioDto {
    return {
      id: entity.id || 0,
      idServicio: typeof entity.servicio === 'number' 
        ? entity.servicio 
        : (entity.servicio as any)?.id || 0,
      idUsuario: typeof entity.usuario === 'number' 
        ? entity.usuario 
        : (entity.usuario as any)?.id || 0,
      idInmueble: typeof entity.inmueble === 'number' 
        ? entity.inmueble 
        : (entity.inmueble as any)?.id || 0,
      fecha: entity.fecha || '',
      estado: entity.estado || 'SOLICITADA',
      descripcionProblema: entity.descripcionProblema || ''
    }
  }
}
