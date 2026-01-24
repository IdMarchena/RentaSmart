import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Publicacion } from '@/types/entitys'
import type { Multimedia } from '@/types/entitys'
import type { PublicacionRepository } from './PublicacionRepository'
export class BackendPublicacionRepository implements PublicacionRepository {
  async getAll(): Promise<Publicacion[]> {
    console.log('Iniciando getAll()...');
    const response = await http<JsonResponse<any[]>>('/api/publicaciones')
    
    console.log('Response del backend:', response);
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener publicaciones')
    }

    console.log('Datos crudos del backend:', response.data);
    console.log('Cantidad de datos crudos:', response.data.length);

    // Mapear cada DTO a Entity y filtrar los nulos
    const mapped = response.data.map(dto => this.mapToEntity(dto));
    console.log('Después de mapToEntity:', mapped);
    
    const filtered = mapped.filter(pub => pub !== null);
    console.log('Después de filtrar nulos:', filtered);
    console.log('Cantidad final:', filtered.length);
    
    return filtered;
  }

  async getById(id: number): Promise<Publicacion | null> {
    try {
      const response = await http<JsonResponse<any>>(`/api/publicaciones/id/${id}`)
      
      if(!response.success || !response.data) {
        return null
      }

      console.log('Datos del backend (raw):', response.data)
      
      // Aplicar mapeo manual para convertir DTO a Entity
      const mapped = this.mapToEntity(response.data)
      console.log('Datos mapeados:', mapped)
      
      return mapped
    } catch {
      return null
    }
  }

  async create(data: Omit<Publicacion, 'id'>): Promise<Publicacion> {
    const response = await http<JsonResponse<Publicacion>>('/api/publicaciones', {
      method: 'POST',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear publicación')
    }

    return response.data
  }

  async update(id: number, data: Partial<Publicacion>): Promise<Publicacion> {
    const response = await http<JsonResponse<Publicacion>>(`/api/publicaciones/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data)
    })
    
    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar publicación')
    }

    return response.data
  }

  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/publicaciones/${id}`, {
      method: 'DELETE'
    })
  }

  async getByEstado(estado: string): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/estado?estado=${encodeURIComponent(estado)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByTitulo(titulo: string): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/titulo?titulo=${encodeURIComponent(titulo)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByPrecioMenor(precio: number): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/precio/menor?precio=${precio}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByPrecioMayor(precio: number): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/precio/mayor?precio=${precio}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByPrecioRango(precioMin: number, precioMax: number): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/precio/rango?precioMin=${precioMin}&precioMax=${precioMax}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByNombreInmueble(nombre: string): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/nombreInmueble?nombre=${encodeURIComponent(nombre)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByUbicacionInmueble(ubicacion: string): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/ubicacion?ubicacion=${encodeURIComponent(ubicacion)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByEstratoInmueble(estrato: string): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/estratoInmueble?estrato=${encodeURIComponent(estrato)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByUbicacionYEstado(ubicacionId: number, estado: string): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/ubicacion/${ubicacionId}/estado?estado=${encodeURIComponent(estado)}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByNombreYEstrato(nombre: string, estrato: number): Promise<Publicacion[]> {
    const response = await http<JsonResponse<Publicacion[]>>(
      `/api/publicaciones/nombre_estrato?nombre=${encodeURIComponent(nombre)}&estrato=${estrato}`
    )
    
    if (!response.success || !response.data) return []
    return response.data
  }

  async getByIdArrendatario(id: number): Promise<Publicacion[]> {
    const response = await http<JsonResponse<any[]>>(
      `/api/publicaciones/arrendatario/${id}`
    )
    
    if (!response.success || !response.data) return []
    
    // Mapear cada DTO a Entity y filtrar los nulos
    return response.data.map(dto => this.mapToEntity(dto)).filter(pub => pub !== null)
  }

  async getByIdUsuario(id: number): Promise<Publicacion[]> {
    const response = await http<JsonResponse<any[]>>(
      `/api/publicaciones/usuario/${id}`
    )
    
    if (!response.success || !response.data) return []
    
    // Mapear cada DTO a Entity y filtrar los nulos
    return response.data.map(dto => this.mapToEntity(dto)).filter(pub => pub !== null)
  }

  async getTop6(): Promise<Publicacion[]> {
    const response = await http<JsonResponse<any[]>>('/api/publicaciones/top6')
    
    if (!response.success || !response.data) return []
    
    // Mapear cada DTO a Entity y filtrar los nulos
    return response.data.map(dto => this.mapToEntity(dto)).filter(pub => pub !== null)
  }

  async cambiarEstado(id: number, estado: string): Promise<void> {
    await http<JsonResponse<void>>(`/api/publicaciones/${id}/estado?estado=${encodeURIComponent(estado)}`, {
      method: 'PUT'
    })
  }

// En BackendPublicacionRepository
private mapToDto(entity: any): any {
  return {
    titulo: entity.titulo,
    descripcion: entity.descripcion,
    precio: entity.precio,
    estadoPublicacion: entity.estadoPublicacion,
    fechaPublicacion: entity.fechaPublicacion ?? new Date().toISOString(),

    idInmueble: entity.idInmueble || entity.inmueble?.id,
    idUsuario: entity.idUsuario || entity.usuario?.id,

    multimedia: entity.multimedia?.map((m: any) => ({
      id: m.id,
      url: m.url,
      tipo: m.tipo,
      orden: m.orden,
    })) ?? [],

    calificacionesIds:
      entity.calificaciones?.map((c: any) => c.id) ?? [],
  };
}

private mapToEntity(dto: any): Publicacion {
  return {
    id: dto.id,
    titulo: dto.titulo || dto.titulo_publicacion,
    descripcion: dto.descripcion || dto.descripcion_publicacion,
    precio: dto.precio,
    fechaPublicacion: dto.fechaPublicacion || dto.fecha_publicacion,
    estadoPublicacion: dto.estadoPublicacion || dto.estado_publicacion,
    usuario: { id: dto.idUsuario || dto.id_usuario } as any,
    inmueble: { id: dto.idInmueble } as any,
    multimedia: dto.multimedia ?? [],
    calificaciones: []
  };
}

}
