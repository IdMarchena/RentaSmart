import { useState } from 'react'
import { chatRepository } from '@/repositories'
import type { Chat } from '@/types/entitys'

export const useChat = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Chat[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await chatRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener chats'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Chat | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await chatRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener chat'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Chat, 'id'>): Promise<Chat> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await chatRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear chat'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Chat>): Promise<Chat> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await chatRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar chat'
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
      await chatRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar chat'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByName = async (nombre: string): Promise<Chat | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await chatRepository.getByName(nombre)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener chat por nombre'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
    getByName
  }
}
