import { useState } from 'react'
import { mensajeRepository } from '@/repositories'
import type { Mensaje } from '@/types/entitys'

export const useMensaje = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);

  const getAll = async (): Promise<Mensaje[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.getAll()
      setMensajes(result); // Guardamos los mensajes obtenidos en el estado
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener mensajes'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Mensaje | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener mensaje'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Mensaje, 'id'>): Promise<Mensaje> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al enviar mensaje'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Omit<Mensaje, 'id'>): Promise<Mensaje> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar mensaje'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: number): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await mensajeRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar mensaje'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados

  const getByChat = async (chatId: number, pagina: number, tamano: number): Promise<Mensaje[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.getByChat(chatId, pagina, tamano)
      setMensajes(result); // Guardamos los mensajes obtenidos en el estado
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener mensajes del chat'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (chatId: number, usuarioId: number): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await mensajeRepository.markAsRead(chatId, usuarioId)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al marcar mensajes como leídos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const countUnreadMessages = async (chatId: number, usuarioId: number): Promise<number> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.countUnreadMessages(chatId, usuarioId)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al contar mensajes no leídos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const searchInChat = async (chatId: number, query: string): Promise<Mensaje[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await mensajeRepository.searchInChat(chatId, query)
      setMensajes(result); // Almacena los mensajes obtenidos de la búsqueda
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar en el chat'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    mensajes, // Retorna los mensajes almacenados
    getAll,
    getById,
    create,
    update,
    remove,
    getByChat,
    markAsRead,
    countUnreadMessages,
    searchInChat // Incluye el método de búsqueda en el retorno
  }
}
