import type { Financiacion } from '@/types/entitys'

export interface FinanciacionRepository {
  getAll(): Promise<Financiacion[]>
  getById(id: number): Promise<Financiacion | null>
  create(data: Omit<Financiacion, 'id'>): Promise<Financiacion>
  update(id: number, data: Omit<Financiacion, 'id'>): Promise<void>
  delete(id: number): Promise<void>
  generatePaymentPlan(id: number): Promise<Financiacion[]>
  simulatePaymentPlan(numeroCuotas: number, montoTotal: number, interes: number): Promise<Financiacion[]>
  validateFinanciacion(id: number): Promise<boolean>
}
