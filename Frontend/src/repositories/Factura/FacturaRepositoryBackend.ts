import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Factura } from '@/types/entitys'
import type { FacturaDto } from '@/types/dtos'
import type { FacturaRepository } from './FacturaRepository'

export class BackendFacturaRepository implements FacturaRepository {

  // Obtener todas las facturas
  async getAll(): Promise<Factura[]> {
    const response = await http<JsonResponse<FacturaDto[]>>('/api/v1/facturas')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las facturas')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener una factura por ID
  async getById(id: number): Promise<Factura | null> {
    try {
      const response = await http<JsonResponse<FacturaDto>>(`/api/v1/facturas/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear una factura
  async create(data: Omit<Factura, 'id'>): Promise<Factura> {
    const response = await http<JsonResponse<FacturaDto>>('/api/v1/facturas', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la factura')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar una factura
  async update(id: number, data: Partial<Factura>): Promise<Factura> {
    const response = await http<JsonResponse<FacturaDto>>(`/api/v1/facturas/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar la factura')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar una factura
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/facturas/${id}`, {
      method: 'DELETE',
    })
  }

  // Obtener facturas por ID de usuario
  async getByUsuarioId(idUsuario: number): Promise<Factura[]> {
    const response = await http<JsonResponse<FacturaDto[]>>(`/api/v1/facturas/usuario/${idUsuario}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Obtener facturas por ID de contrato
  async getByContratoId(idContrato: number): Promise<Factura[]> {
    const response = await http<JsonResponse<FacturaDto[]>>(`/api/v1/facturas/contrato/${idContrato}`)

    if (!response.success || !response.data) {
      return []
    }

    return this.mapToEntity(response.data)
  }

  // Generar factura para un contrato
  async generateFacturaForContrato(idContrato: number): Promise<Factura> {
    const response = await http<JsonResponse<FacturaDto>>(`/api/v1/facturas/contrato/${idContrato}/generar`)

    if (!response.success || !response.data) {
      throw new Error('No se pudo generar la factura')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Obtener el estado de pago de una factura
  async getFacturaPagoStatus(id: number): Promise<string> {
    const response = await http<JsonResponse<string>>(`/api/v1/facturas/${id}/estado`)

    if (!response.success || !response.data) {
      throw new Error('No se pudo obtener el estado de pago de la factura')
    }

    return response.data
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: FacturaDto[]): Factura[] {
    return dtos.map(dto => ({
      id: dto.id,
      fechaEmision: dto.fechaEmision,
      detalle: dto.detalle,
      usuario: { id: dto.idUsuario } as any,  // Puede que necesites mapear a un objeto Usuario
      pago: { id: dto.idPago } as any,        // Puede que necesites mapear a un objeto Pago
      tipoFactura: dto.tipoFactura,
      idOrigen: dto.idOrigen,
      estadoFactura: dto.estadoFactura,
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: Partial<Factura>): FacturaDto {
    return {
      id: entity.id || 0,
      fechaEmision: entity.fechaEmision!,
      detalle: entity.detalle!,
      idUsuario: typeof entity.usuario === 'number' 
        ? entity.usuario 
        : (entity.usuario as any)?.id || 0,
      idPago: typeof entity.pago === 'number' 
        ? entity.pago 
        : (entity.pago as any)?.id || 0,
      tipoFactura: entity.tipoFactura!,
      idOrigen: entity.idOrigen!,
      estadoFactura: entity.estadoFactura!,
    }
  }
}
