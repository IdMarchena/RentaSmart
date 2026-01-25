import type { Chat } from '@/types/entitys'

export interface ChatRepository {
  getAll(): Promise<Chat[]>
  getAllByUserId(id: number): Promise<Chat[]>
  getById(id: number): Promise<Chat | null>
  create(data: Omit<Chat, 'id'>): Promise<Chat>
  update(id: number, data: Partial<Chat>): Promise<Chat>
  delete(id: number): Promise<void>

  getByName(nombre: string): Promise<Chat | null>
}
