import type { Cita } from '@/types/entitys'

export interface CitaRepository {
  getAll(): Promise<Cita[]>
  getById(id: number): Promise<Cita | null>
  create(data: Omit<Cita, 'id'>): Promise<Cita>
  update(id: number, data: Partial<Cita>): Promise<Cita>
  delete(id: number): Promise<void>

  getByUsuarioId(idUsuario: number): Promise<Cita[]>
  getByServicioId(idServicio: number): Promise<Cita[]>
  getByPublicacionId(idPublicacion: number): Promise<Cita[]>
  getByEstado(estado: string): Promise<Cita[]>
  getByFecha(fecha: string): Promise<Cita[]>
}
