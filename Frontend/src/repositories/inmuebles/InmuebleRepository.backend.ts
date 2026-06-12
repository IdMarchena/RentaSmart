import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Inmueble } from '@/types/entitys'
import type { InmuebleRepository } from './InmuebleRepository'

export class BackendInmuebleRepository implements InmuebleRepository {
  async getAll(): Promise<Inmueble[]> {
    const response = await http<JsonResponse<Inmueble[]>>('/api/v1/inmuebles')
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener inmuebles')
    }

    return response.data
  }

  async getById(id: number): Promise<Inmueble | null> {
    try {
      const response = await http<JsonResponse<Inmueble>>(`/api/v1/inmuebles/${id}`)
      
      if (!response.success || !response.data) {
        return null
      }

      return response.data
    } catch {
      return null
    }
  }

  async create(data: Omit<Inmueble, 'id'>): Promise<Inmueble> {
    const response = await http<JsonResponse<Inmueble>>('/api/v1/inmuebles', {
      method: 'POST',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear inmueble')
    }

    return response.data
  }

  async update(id: number, data: Partial<Inmueble>): Promise<Inmueble> {
    const response = await http<JsonResponse<Inmueble>>(`/api/v1/inmuebles/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar inmueble')
    }

    return response.data
  }

  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/inmuebles/${id}`, {
      method: 'DELETE'
    })
  }

  async getByUbicacion(id: number): Promise<Inmueble[]> {
    const response = await http<JsonResponse<Inmueble[]>>(`/api/v1/inmuebles/ubicacion/${id}`)
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByEstado(estado: string): Promise<Inmueble[]> {
    const response = await http<JsonResponse<Inmueble[]>>(
      `/api/v1/inmuebles/estado?estado=${encodeURIComponent(estado)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByNombre(nombre: string): Promise<Inmueble[]> {
    const response = await http<JsonResponse<Inmueble[]>>(
      `/api/v1/inmuebles/nombre?nombre=${encodeURIComponent(nombre)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByEstrato(estrato: number): Promise<Inmueble[]> {
    const response = await http<JsonResponse<Inmueble[]>>(
      `/api/v1/inmuebles/estrato?estrato=${estrato}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByTipo(tipo: string): Promise<Inmueble[]> {
    const response = await http<JsonResponse<Inmueble[]>>(`/api/v1/inmuebles/tipo/${tipo}`)
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async cambiarEstado(id: number, estado: string): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/inmuebles/${id}/estado?estado=${encodeURIComponent(estado)}`, {
      method: 'PUT'
    })
  }

// En BackendInmuebleRepository.ts

private mapToDto(entity: any): any { // Cambiamos a any para flexibilidad
  return {
    tipo: entity.tipo?.toUpperCase(),
    descripcion: entity.descripcion,
    
    // CORRECCIÓN: Intentar leer del ID plano o del objeto anidado
    idUbicacion: entity.idUbicacion || entity.ubicacion?.id,
    
    areaTotal: entity.areaTotal,
    numeroBanos: entity.numeroBanos,
    numeroPisos: entity.numeroPisos,
    capacidadPersonas: entity.capacidadPersonas,
    estrato: entity.estrato,
    estadoInmueble: (entity.estadoInmueble || entity.estado || 'DISPONIBLE').toUpperCase(),
    nombre: entity.nombre,
    
    // CORRECCIÓN: Lo mismo para el arrendatario
    idArrendatario: entity.idArrendatario || entity.arrendatario?.id,
    
    numeroHabitaciones: entity.numeroHabitaciones
  }
}
}
