import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { UsuarioRegistrado } from '@/types/entities'
import type { 
  UsuarioRegistradoRepository, 
  UsuarioRegistradoSearchResult 
} from './UsuarioRegistradoRepository'

export class BackendUsuarioRegistradoRepository implements UsuarioRegistradoRepository {
  async getAll(): Promise<UsuarioRegistrado[]> {
    const response = await http<JsonResponse<any[]>>('/api/usuarios-registrados')
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener usuarios registrados')
    }

    return response.data.map(this.mapToEntity)
  }

  async getById(id: number): Promise<UsuarioRegistrado | null> {
    try {
      const response = await http<JsonResponse<any>>(`/api/usuarios-registrados/${id}`)
      
      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity(response.data)
    } catch {
      return null
    }
  }

  async getByUbicacion(ubicacion: string): Promise<UsuarioRegistradoSearchResult[]> {
    const response = await http<JsonResponse<any[]>>(
      `/api/usuarios-registrados/buscar?ubicacion=${encodeURIComponent(ubicacion)}`
    )
    
    if (!response.success || !response.data) {
      return []
    }

    return response.data.map(this.mapToSearchResult)
  }

  async create(data: Omit<UsuarioRegistrado, 'id'>): Promise<UsuarioRegistrado> {
    const response = await http<JsonResponse<any>>('/api/usuarios-registrados', {
      method: 'POST',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear usuario registrado')
    }

    return this.mapToEntity(response.data)
  }

  async update(id: number, data: Partial<UsuarioRegistrado>): Promise<UsuarioRegistrado> {
    // Nota: Tu controller no tiene PUT, solo POST, GET, DELETE
    // Este método lanzará error hasta que agregues PUT al backend
    throw new Error('Método update no implementado en el backend. Agrega PUT /api/usuarios-registrados/{id}')
  }

  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/usuarios-registrados/${id}`, {
      method: 'DELETE'
    })
  }

  private mapToEntity(dto: any): UsuarioRegistrado {
    return {
      id: dto.id,
      nombre: dto.nombre,
      correo: dto.correo,
      telefono: dto.telefono,
      ubicacion: dto.ubicacion?.nombre || dto.ubicacion, // Puede ser objeto o string
      fechaRegistro: dto.fechaRegistro,
      estado: dto.estado?.toLowerCase() || 'activo'
    }
  }

  private mapToSearchResult(dto: any): UsuarioRegistradoSearchResult {
    return {
      id: dto.id,
      nombre: dto.nombre,
      correo: dto.correo,
      telefono: dto.telefono,
      ubicacion: dto.ubicacion?.nombre || dto.ubicacion
    }
  }

  private mapToDto(entity: Partial<UsuarioRegistrado>): any {
    return {
      nombre: entity.nombre,
      correo: entity.correo,
      telefono: entity.telefono,
      ubicacion: entity.ubicacion,
      fechaRegistro: entity.fechaRegistro,
      estado: entity.estado?.toUpperCase()
    }
  }
}
