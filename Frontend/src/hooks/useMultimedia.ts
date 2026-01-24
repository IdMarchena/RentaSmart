import { useState } from 'react'
import { multimediaRepository } from '@/repositories'
import type { Multimedia } from '@/types/entities'

export const useMultimedia = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Multimedia[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await multimediaRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener multimedias'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Multimedia | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await multimediaRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener multimedia'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Multimedia, 'id'>): Promise<Multimedia> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await multimediaRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear multimedia'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Multimedia>): Promise<Multimedia> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await multimediaRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar multimedia'
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
      await multimediaRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar multimedia'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByPublicacion = async (publicacionId: number): Promise<Multimedia[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await multimediaRepository.getByPublicacion(publicacionId)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener multimedias de publicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByTipo = async (tipo: string): Promise<Multimedia[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await multimediaRepository.getByTipo(tipo)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al filtrar por tipo'
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
    getByPublicacion,
    getByTipo
  }
}
