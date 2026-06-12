import type { Servicio } from '@/types/entitys'

export interface ServicioRepository {
  getAll(): Promise<Servicio[]>
  getById(id: number): Promise<Servicio | null>
  create(data: Omit<Servicio, 'id'>): Promise<Servicio>
  update(id: number, data: Omit<Servicio, 'id'>): Promise<Servicio>
  delete(id: number): Promise<void>
  getByName(nombre: string): Promise<Servicio[]>
  getByType(tipo: string): Promise<Servicio[]>
  getByStatus(estado: string): Promise<Servicio[]>
  getByNameAndPrice(nombre: string, precio: number): Promise<Servicio[]>
  getByUserId(id: number): Promise<Servicio[]>
  changeServiceState(id: number, estado: string): Promise<void>
}
  