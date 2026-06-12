import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Contrato } from '@/types/entitys'
import type { ContratoDto } from '@/types/dtos'
import type { ContratoRepository } from './ContratoRepository'

export class BackendContratoRepository implements ContratoRepository {

  // Obtener todos los contratos
  async getAll(): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>('/api/contratos')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los contratos')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contrato por ID
  async getById(id: number): Promise<Contrato | null> {
    try {
      const response = await http<JsonResponse<ContratoDto>>(`/api/contratos/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear contrato
  async create(data: Omit<Contrato, 'id'>): Promise<Contrato> {
    const response = await http<JsonResponse<ContratoDto>>('/api/contratos', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear el contrato')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar contrato
  async update(id: number, data: Partial<Contrato>): Promise<Contrato> {
    const response = await http<JsonResponse<ContratoDto>>(`/api/contratos/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar el contrato')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar contrato
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/contratos/${id}`, {
      method: 'DELETE',
    })
  }

  // Obtener contratos por ID de usuario
  async getByUsuarioId(idUsuario: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/usuario/${idUsuario}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos por ID de arrendador
  async getByArrendadorId(idArrendador: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/arrendador/${idArrendador}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }
    async getByArrendatarioId(idArrendatario: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/arrendatario/${idArrendatario}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos por ID de inmueble
  async getByInmuebleId(idInmueble: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/inmueble/${idInmueble}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos por estado
  async getByEstado(estado: string): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/estado/${estado}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos activos como arrendador
  async getContratosActivosArrendador(idArrendador: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/arrendador/${idArrendador}/activos`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos finalizados como arrendador
  async getContratosFinalizadosArrendador(idArrendador: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/arrendador/${idArrendador}/finalizados`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos activos como arrendatario
  async getContratosActivosArrendatario(idArrendatario: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/arrendatario/${idArrendatario}/activos`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos finalizados como arrendatario
  async getContratosFinalizadosArrendatario(idArrendatario: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/arrendatario/${idArrendatario}/finalizados`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener contratos por mes
  async getContratosPorMes(idArrendador: number): Promise<Map<string, number>> {
    const response = await http<JsonResponse<Map<string, number>>>(`/api/contratos/metricas/arrendador/${idArrendador}/contratos-por-mes`)

    if (!response.success || !response.data) {
      throw new Error('Error al obtener los contratos por mes')
    }

    return response.data
  }

  // Obtener ingresos como arrendador
  async getIngresoArrendador(idArrendador: number): Promise<number> {
    const response = await http<JsonResponse<number>>(`/api/contratos/metricas/arrendador/${idArrendador}/ingreso`)

    if (!response.success || response.data == null) {
      throw new Error('Error al obtener los ingresos del arrendador')
    }

    return response.data
  }

  async getContratosProximosAVencer(idUsuario: number,dias: number): Promise<Contrato[]> {
    const response = await http<JsonResponse<ContratoDto[]>>(`/api/contratos/proximos-a-vencer?idUsuario=${idUsuario}&dias=${dias}`)
    if (!response.success || !response.data) {
      return []
    }
    return this.mapToEntity(response.data)
  }

  async contarContratosComoArrendatario(idArrendatario: number): Promise<number> {
    const response = await http<JsonResponse<number>>(`/api/contratos/metricas/arrendatario/${idArrendatario}/cantidad`)
    if (!response.success || response.data == null) {
      throw new Error('Error al obtener cantidad de contratos como arrendatario')
    }
    return response.data
  }


  // Mapeo de DTO a Entity
  private mapToEntity(dtos: ContratoDto[]): Contrato[] {
    return dtos.map(dto => ({
      id: dto.id,
      contenido: dto.contenido,
      usuarioArrendatario: { id: dto.idUsuarioArrendatario } as any,
      usuarioArrendador: { id: dto.idUsuarioArrendador } as any,
      inmueble: { id: dto.idInmueble } as any,
      financiacion: { id: dto.idFinanciacion } as any,
      fechaInicio: dto.fechaInicio,
      fechaFinalizacion: dto.fechaFinalizacion,
      precio: dto.precio,
      estadoContrato: dto.estadoContrato,
      deposito: dto.deposito,
      clausulasEspeciales: dto.clausulasEspeciales,
      diaDePago: dto.diaDePago,
    }))
  }

  
private mapToDto(entity: any): any {
  return {
      contenido: entity.contenido!,
      idUsuarioArrendatario: entity.idUsuarioArrendatario || entity.usuarioArrendatario?.id,
      idUsuarioArrendador: entity.idUsuarioArrendador || entity.usuarioArrendador?.id,
      idInmueble: entity.idInmueble || entity.inmueble?.id,
      idFinanciacion: entity.idFinanciacion || entity.financiacion?.id,
      fechaInicio: entity.fecha || new Date().toISOString(),
      fechaFinalizacion: entity.fecha || new Date().toISOString(),
      precio: entity.precio!,
      estadoContrato: entity.estadoContrato!,
      deposito: entity.deposito!,
      clausulasEspeciales: entity.clausulasEspeciales!,
      diaDePago: entity.diaDePago!,
    }
  }
}
