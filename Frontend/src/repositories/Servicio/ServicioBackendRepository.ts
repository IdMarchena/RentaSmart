import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { ServicioDto } from '@/types/dtos'
import type { Servicio } from '@/types/entitys'
import type { ServicioRepository } from './ServicioRepository'

export class BackendServicioRepository implements ServicioRepository {

  // Obtener todos los servicios
  async getAll(): Promise<Servicio[]> {
    const response = await http<JsonResponse<ServicioDto[]>>('/api/servicios')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los servicios')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener un servicio por ID
  async getById(id: number): Promise<Servicio | null> {
    try {
      const response = await http<JsonResponse<ServicioDto>>(`/api/servicios/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear un servicio
  async create(data: Omit<Servicio, 'id'>): Promise<Servicio> {
    const response = await http<JsonResponse<ServicioDto>>('/api/servicios', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear el servicio')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar un servicio
  async update(id: number, data: Omit<Servicio, 'id'>): Promise<Servicio> {
    const response = await http<JsonResponse<ServicioDto>>(`/api/servicios/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar el servicio')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar un servicio
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/servicios/${id}`, {
      method: 'DELETE',
    })
  }

  // Buscar servicios por nombre
  async getByName(nombre: string): Promise<Servicio[]> {
    const response = await http<JsonResponse<ServicioDto[]>>(`/api/servicios/nombre/${nombre}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar servicios por nombre')
    }

    return this.mapToEntity(response.data)
  }

  // Buscar servicios por tipo
  async getByType(tipo: string): Promise<Servicio[]> {
    const response = await http<JsonResponse<ServicioDto[]>>(`/api/servicios/tipo/${tipo}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar servicios por tipo')
    }

    return this.mapToEntity(response.data)
  }

  // Buscar servicios por estado
  async getByStatus(estado: string): Promise<Servicio[]> {
    const response = await http<JsonResponse<ServicioDto[]>>(`/api/servicios/estado/${estado}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar servicios por estado')
    }

    return this.mapToEntity(response.data)
  }

  // Buscar servicios por nombre y precio
  async getByNameAndPrice(nombre: string, precio: number): Promise<Servicio[]> {
    const response = await http<JsonResponse<ServicioDto[]>>(`/api/servicios/nombre/precio?nombre=${nombre}&precio=${precio}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar servicios por nombre y precio')
    }

    return this.mapToEntity(response.data)
  }

  async getByUserId(id: number): Promise<Servicio[]> {
    const response = await http<JsonResponse<ServicioDto[]>>(`/api/servicios/user/${id}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar servicios por usuario')
    }

    return this.mapToEntity(response.data)
  }

  // Cambiar el estado de un servicio
  async changeServiceState(id: number, estado: string): Promise<void> {
    await http<JsonResponse<void>>(`/api/servicios/${id}/estado?estado=${estado}`, {
      method: 'PUT',
    })
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: ServicioDto[]): Servicio[] {
    return dtos.map(dto => ({
      id: dto.id,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      usuario: { id: dto.idUsuario } as any, // Referencia al usuario
      tipo: dto.tipo,
      precio: dto.precio,
      estadoServicio: dto.estadoServicio,
      ubicacion: { id: dto.idUbicacion } as any, // Referencia a la ubicación
      calificaciones: dto.calificacionesIds.map(id => ({ id })) as any // Referencia a calificaciones
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: any): any {
    return {
      nombre: entity.nombre || '',
      descripcion: entity.descripcion || '',
      idUsuario: entity.usuario?.id || entity.idUsuario,
      tipo: entity.tipo || 'OTRO',
      precio: entity.precio || 0,
      estadoServicio: entity.estadoServicio || 'PENDIENTE',
      idUbicacion: entity.ubicacion?.id || entity.idUbicacion,
      calificacionesIds: Array.isArray(entity.calificaciones) 
        ? entity.calificaciones.map((c: any) => c.id)
        : [],
    }
  }
}
