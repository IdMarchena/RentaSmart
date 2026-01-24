import type { UsuarioRegistrado } from '@/types/entities'

export interface UsuarioRegistradoSearchResult {
  id: number
  nombre: string
  correo: string
  telefono: string
  ubicacion: string
}

export interface UsuarioRegistradoRepository {
  getAll(): Promise<UsuarioRegistrado[]>
  getById(id: number): Promise<UsuarioRegistrado | null>
  getByUbicacion(ubicacion: string): Promise<UsuarioRegistradoSearchResult[]>
  create(data: Omit<UsuarioRegistrado, 'id'>): Promise<UsuarioRegistrado>
  update(id: number, data: Partial<UsuarioRegistrado>): Promise<UsuarioRegistrado>
  delete(id: number): Promise<void>
}
