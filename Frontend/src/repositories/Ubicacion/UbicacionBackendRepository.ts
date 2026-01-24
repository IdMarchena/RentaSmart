import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { UbicacionDto } from '@/types/dtos'
import type { Ubicacion } from '@/types/entitys'
import type { UbicacionRepository } from '@/repositories/Ubicacion/UbicacionRepository'

export class BackendUbicacionRepository implements UbicacionRepository {

  // Obtener todas las ubicaciones
  async getAll(): Promise<Ubicacion[]> {
    const response = await http<JsonResponse<UbicacionDto[]>>('/api/ubicaciones')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las ubicaciones')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener una ubicación por ID
  async getById(id: number): Promise<Ubicacion | null> {
  try {
    const response = await http<JsonResponse<UbicacionDto>>(`/api/ubicaciones/${id}`);
    
    console.log("📡 [Repo] Respuesta del servidor:", response);

    if (!response.success || !response.data) {
      console.warn("⚠️ [Repo] La respuesta no fue exitosa o no hay data:", response.message);
      return null;
    }

    // Si llegamos aquí, hay data. Vamos a ver si el mapeo falla.
    const entities = this.mapToEntity([response.data]);
    console.log("🗺️ [Repo] Resultado del mapeo:", entities[0]);
    
    return entities[0];
  } catch (error) {
    // IMPORTANTE: Imprime el error real para saber si es un fallo de red o de código
    console.error("❌ [Repo] Error crítico en getById:", error);
    return null;
  }
}

  // Crear una nueva ubicación
  async create(data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> {
    const response = await http<JsonResponse<UbicacionDto>>('/api/ubicaciones', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la ubicación')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar una ubicación
  async update(id: number, data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> {
    const response = await http<JsonResponse<UbicacionDto>>(`/api/ubicaciones/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar la ubicación')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar una ubicación
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/ubicaciones/${id}`, {
      method: 'DELETE',
    })
  }

  // Buscar ubicaciones por estado
  async getByEstado(estado: string): Promise<Ubicacion[]> {
    const response = await http<JsonResponse<UbicacionDto[]>>(`/api/ubicaciones/estado/${estado}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar ubicaciones por estado')
    }

    return this.mapToEntity(response.data)
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: UbicacionDto[]): Ubicacion[] {
    return dtos.map(dto => ({
      id: dto.id,
      padre: dto.id_padre ? { id: dto.id_padre } as any : null, // Referencia al padre
      nombre: dto.nombre,
      latitud: dto.latitud,
      longitud: dto.longitud,
      estado: dto.estado,
      created_at: '', // Debes asignar los campos created_at y updated_at si están disponibles
      updated_at: '',
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: Partial<Ubicacion>): UbicacionDto {
    const dto: any = {
    id_padre: entity.padre ? entity.padre.id : 1,
    nombre: entity.nombre || '',
    latitud: entity.latitud || 0,
    longitud: entity.longitud || 0,
    estado: entity.estado || 'ACTIVA',
    };
  // Solo incluimos el ID si realmente existe y es mayor a 0
    if (entity.id && entity.id > 0) {
      dto.id = entity.id;
    }

    return dto;
  }
}
