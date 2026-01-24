import type { Contrato } from '@/types/entitys'

export interface ContratoRepository {
  getAll(): Promise<Contrato[]>
  getById(id: number): Promise<Contrato | null>
  create(data: Omit<Contrato, 'id'>): Promise<Contrato>
  update(id: number, data: Partial<Contrato>): Promise<Contrato>
  delete(id: number): Promise<void>

  getByUsuarioId(idUsuario: number): Promise<Contrato[]>
  getByArrendadorId(idArrendador: number): Promise<Contrato[]>
  getByArrendatarioId(idArrendatario: number): Promise<Contrato[]>
  getByInmuebleId(idInmueble: number): Promise<Contrato[]>
  getByEstado(estado: string): Promise<Contrato[]>
  getContratosActivosArrendador(idArrendador: number): Promise<Contrato[]>
  getContratosFinalizadosArrendador(idArrendador: number): Promise<Contrato[]>
  getContratosActivosArrendatario(idArrendatario: number): Promise<Contrato[]>
  getContratosFinalizadosArrendatario(idArrendatario: number): Promise<Contrato[]>
  getContratosPorMes(idArrendador: number): Promise<Map<string, number>>
  getIngresoArrendador(idArrendador: number): Promise<number>

  getContratosProximosAVencer(idUsuario: number, dias: number): Promise<Contrato[]>
  contarContratosComoArrendatario(idArrendatario: number): Promise<number>
}
