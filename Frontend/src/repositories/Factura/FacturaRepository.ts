import type { Factura } from '@/types/entitys'

export interface FacturaRepository {
  getAll(): Promise<Factura[]>
  getById(id: number): Promise<Factura | null>
  create(data: Omit<Factura, 'id'>): Promise<Factura>
  update(id: number, data: Partial<Factura>): Promise<Factura>
  delete(id: number): Promise<void>

  getByUsuarioId(idUsuario: number): Promise<Factura[]>
  getByContratoId(idContrato: number): Promise<Factura[]>
  generateFacturaForContrato(idContrato: number): Promise<Factura>
  getFacturaPagoStatus(id: number): Promise<string>
}
