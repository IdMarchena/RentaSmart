import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { Chat } from '@/types/entitys'
import type { ChattDto } from '@/types/dtos'
import type { ChatRepository } from './ChatRepository'

export class BackendChatRepository implements ChatRepository {

  // Obtener todos los chats
  async getAll(): Promise<Chat[]> {
    const response = await http<JsonResponse<ChattDto[]>>('/api/v1/chats')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los chats')
    }

    return this.mapToEntity(response.data)
  }
    async getAllByUserId(id: number): Promise<Chat[]> {
    const response = await http<JsonResponse<ChattDto[]>>(`/api/v1/chats/user/${id}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los chats')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener un chat por su ID
  async getById(id: number): Promise<Chat | null> {
    try {
      const response = await http<JsonResponse<ChattDto>>(`/api/v1/chats/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear un chat
  async create(data: Omit<Chat, 'id'>): Promise<Chat> {
    const response = await http<JsonResponse<ChattDto>>('/api/v1/chats', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al crear el chat')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar un chat
  async update(id: number, data: Partial<Chat>): Promise<Chat> {
    const response = await http<JsonResponse<ChattDto>>(`/api/v1/chats/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar el chat')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar un chat
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/chats/${id}`, {
      method: 'DELETE',
    })
  }

  // Obtener un chat por nombre
  async getByName(nombre: string): Promise<Chat | null> {
    const response = await http<JsonResponse<ChattDto>>(`/api/v1/chats/nombre/${nombre}`)

    if (!response.success || !response.data) {
      return null
    }

    return this.mapToEntity([response.data])[0]
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: ChattDto[]): Chat[] {
    return dtos.map(dto => ({
      id: dto.id,
      nombre: dto.nombre,
      estado_chat: dto.estado_chat, // Corregido: estado_chat no estadoChat
      fechaCreacion: dto.fechaCreacion,
      // En Entity van las relaciones completas
      usuarioA: { id: dto.idUsuarioA } as any, // Referencia a Usuario
      usuarioB: { id: dto.idUsuarioB } as any, // Referencia a Usuario
      mensajes: [] as any, // Array vacío por defecto
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: any): any {
    return {
      nombre: entity.nombre!,
      idUsuarioA: entity.idUsuarioA || entity.usuarioA.id,
      idUsuarioB: entity.idUsuarioB || entity.usuarioB.id,
      idsMensaje: entity.mensajes?.map((mensaje: any) => mensaje.id) || [],
      estado_chat: entity.estado_chat!,
      fechaCreacion: entity.fechaCreacion! || new Date().toISOString(),
    }
  }
}
