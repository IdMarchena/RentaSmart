import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { FinanciacionDto } from '@/types/dtos'
import type { Financiacion } from '@/types/entitys'
import type { FinanciacionRepository } from './FinanciacionRepository'

export class BackendFinanciacionRepository implements FinanciacionRepository {

  // Obtener todas las financiaciones
  async getAll(): Promise<Financiacion[]> {
    const response = await http<JsonResponse<FinanciacionDto[]>>('/api/financiaciones')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener las financiaciones')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener financiación por ID
  async getById(id: number): Promise<Financiacion | null> {
    try {
      const response = await http<JsonResponse<FinanciacionDto>>(`/api/financiaciones/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear una nueva financiación
  async create(data: Omit<Financiacion, 'id'>): Promise<Financiacion> {
    const response = await http<JsonResponse<FinanciacionDto>>('/api/financiaciones', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear la financiación')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar una financiación
  async update(id: number, data: Omit<Financiacion, 'id'>): Promise<void> {
    await http<JsonResponse<void>>(`/api/financiaciones/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })
  }

  // Eliminar una financiación
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/financiaciones/${id}`, {
      method: 'DELETE',
    })
  }

  // Generar plan de pagos
  async generatePaymentPlan(id: number): Promise<Financiacion[]> {
    const response = await http<JsonResponse<FinanciacionDto[]>>(`/api/financiaciones/${id}/plan-pagos`, {
      method: 'POST',
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al generar el plan de pagos')
    }

    return this.mapToEntity(response.data)
  }

  // Simular plan de pagos
  async simulatePaymentPlan(numeroCuotas: number, montoTotal: number, interes: number): Promise<Financiacion[]> {
    const response = await http<JsonResponse<FinanciacionDto[]>>(`/api/financiaciones/simular?numeroCuotas=${numeroCuotas}&montoTotal=${montoTotal}&interes=${interes}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al simular el plan de pagos')
    }

    return this.mapToEntity(response.data)
  }

  // Validar financiación
  async validateFinanciacion(id: number): Promise<boolean> {
    const response = await http<JsonResponse<boolean>>(`/api/financiaciones/${id}/validar`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al validar la financiación')
    }

    return response.data
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: FinanciacionDto[]): Financiacion[] {
    return dtos.map(dto => ({
      id: dto.id,
      numeroCuotas: dto.numeroCuotas,
      valorCuota: dto.valorCuota,
      montoTotal: dto.montoTotal,
      interes: dto.interes,
    }))
  }

  // Mapeo de Entity a DTO
private mapToDto(entity: any): any {
  return {
      numeroCuotas: entity.numeroCuotas || 0,
      valorCuota: entity.valorCuota || 0,
      montoTotal: entity.montoTotal || 0,
      interes: entity.interes || 0,
    }
  }
}
