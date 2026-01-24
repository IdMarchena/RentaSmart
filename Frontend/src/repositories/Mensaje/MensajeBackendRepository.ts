import { http } from '@/api/httpClient'
import type { JsonResponse } from '@/api/types'
import type { MensajeDto } from '@/types/dtos'
import type { Mensaje } from '@/types/entitys'
import type { MensajeRepository } from './MensajeRepository'

export class BackendMensajeRepository implements MensajeRepository {

  // Obtener todos los mensajes
  async getAll(): Promise<Mensaje[]> {
    const response = await http<JsonResponse<MensajeDto[]>>('/api/v1/mensajes')

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los mensajes')
    }

    return this.mapToEntity(response.data)
  }

  // Obtener un mensaje por ID
  async getById(id: number): Promise<Mensaje | null> {
    try {
      const response = await http<JsonResponse<MensajeDto>>(`/api/v1/mensajes/${id}`)

      if (!response.success || !response.data) {
        return null
      }

      return this.mapToEntity([response.data])[0]
    } catch {
      return null
    }
  }

  // Crear un mensaje
  async create(data: Omit<Mensaje, 'id'>): Promise<Mensaje> {
    const response = await http<JsonResponse<MensajeDto>>('/api/v1/mensajes', {
      method: 'POST',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al enviar el mensaje')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Actualizar un mensaje
  async update(id: number, data: Omit<Mensaje, 'id'>): Promise<Mensaje> {
    const response = await http<JsonResponse<MensajeDto>>(`/api/v1/mensajes/${id}`, {
      method: 'PUT',
      body: this.mapToDto(data),
    })

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al actualizar el mensaje')
    }

    return this.mapToEntity([response.data])[0]
  }

  // Eliminar un mensaje
  async delete(id: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/mensajes/${id}`, {
      method: 'DELETE',
    })
  }

  // Obtener historial de mensajes por chat
  async getByChat(chatId: number, pagina: number, tamano: number): Promise<Mensaje[]> {
    const response = await http<JsonResponse<MensajeDto[]>>(`/api/v1/mensajes/chat/${chatId}?pagina=${pagina}&tamano=${tamano}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al obtener los mensajes del chat')
    }

    return this.mapToEntity(response.data)
  }

  // Marcar mensajes como leídos
  async markAsRead(chatId: number, usuarioId: number): Promise<void> {
    await http<JsonResponse<void>>(`/api/v1/mensajes/chat/${chatId}/leidos/${usuarioId}`, {
      method: 'PATCH',
    })
  }

  // Contar mensajes no leídos
  async countUnreadMessages(chatId: number, usuarioId: number): Promise<number> {
    const response = await http<JsonResponse<number>>(`/api/v1/mensajes/chat/${chatId}/no-leidos/${usuarioId}`)

    if (!response.success || response.data === null) {
      throw new Error(response.message || 'Error al contar los mensajes no leídos')
    }

    return response.data
  }

  // Buscar en el chat
  async searchInChat(chatId: number, query: string): Promise<Mensaje[]> {
    const response = await http<JsonResponse<MensajeDto[]>>(`/api/v1/mensajes/chat/${chatId}/buscar?consulta=${query}`)

    if (!response.success || !response.data) {
      throw new Error(response.message || 'Error al buscar en el chat')
    }

    return this.mapToEntity(response.data)
  }

  // Mapeo de DTO a Entity
  private mapToEntity(dtos: MensajeDto[]): Mensaje[] {
    return dtos.map(dto => ({
      id: dto.id,
      chat: { id: dto.idChat } as any, // Referencia al chat
      emisor: { id: dto.idEmisor } as any, // Referencia al usuario emisor
      contenido: dto.contenido,
      estado: dto.estado,
      fechaEnvio: dto.fechaEnvio,
    }))
  }

  // Mapeo de Entity a DTO
  private mapToDto(entity: Partial<Mensaje>): MensajeDto {
    return {
      id: entity.id || 0,
      idChat: typeof entity.chat === 'number' 
      ? entity.chat : (entity.chat?.id || 0),
      idEmisor: typeof entity.emisor === 'number' 
      ? entity.emisor : (entity.emisor as any)?.id || 0,
      contenido: entity.contenido || '',
      estado: entity.estado || 'ACTIVO',
      fechaEnvio: entity.fechaEnvio || new Date().toISOString(),
    }
  }
}
