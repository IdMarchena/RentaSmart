import type { Mensaje } from '@/types/entitys'

export interface MensajeRepository {
  getAll(): Promise<Mensaje[]>
  getById(id: number): Promise<Mensaje | null>
  create(data: Omit<Mensaje, 'id'>): Promise<Mensaje>
  update(id: number, data: Omit<Mensaje, 'id'>): Promise<Mensaje>
  delete(id: number): Promise<void>
  getByChat(chatId: number, pagina: number, tamano: number): Promise<Mensaje[]>
  markAsRead(chatId: number, usuarioId: number): Promise<void>
  countUnreadMessages(chatId: number, usuarioId: number): Promise<number>
  searchInChat(chatId: number, query: string): Promise<Mensaje[]>
}
