import type { SolicitudServicio } from '@/types/entitys'

export interface SolicitudServicioRepository {
  create(data: Omit<SolicitudServicio, 'id'>): Promise<SolicitudServicio>
  getById(id: number): Promise<SolicitudServicio | null>
  update(id: number, data: Omit<SolicitudServicio, 'id'>): Promise<SolicitudServicio>
  getAll(): Promise<SolicitudServicio[]>
  getByUsuario(idUsuario: number): Promise<SolicitudServicio[]>
  getByEstado(estado: string): Promise<SolicitudServicio[]>
  getByServicio(idServicio: number): Promise<SolicitudServicio[]>
  getByInmueble(idInmueble: number): Promise<SolicitudServicio[]>
  getByFechaBetween(startDate: string, endDate: string): Promise<SolicitudServicio[]>
  delete(id: number): Promise<void>
}
