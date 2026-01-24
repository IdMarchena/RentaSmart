import { useState } from 'react'
import { favoritoRepository } from '@/repositories'
import type { Favorito } from '@/types/entitys'

export const useFavorito = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Favorito[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await favoritoRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener favoritos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Favorito | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await favoritoRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener favorito'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Favorito, 'id'>): Promise<Favorito> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await favoritoRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear favorito'
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
      await favoritoRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar favorito'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByUsuarioId = async (idUsuario: number): Promise<Favorito[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await favoritoRepository.getByUsuarioId(idUsuario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener favoritos por usuario'
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
    remove,
    getByUsuarioId
  }
}
