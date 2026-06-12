import { useState } from 'react'
import { calificacionRepository } from '@/repositories'
import type { Calificacion } from '@/types/entitys'

export const useCalificacion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Calificacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await calificacionRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener calificaciones'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Calificacion | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await calificacionRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener calificación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Calificacion, 'id'>): Promise<Calificacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await calificacionRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear calificación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Calificacion>): Promise<Calificacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await calificacionRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar calificación'
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
      await calificacionRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar calificación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByServicioId = async (idServicio: number): Promise<Calificacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await calificacionRepository.getByServicioId(idServicio)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener calificaciones por servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByPublicacionId = async (idPublicacion: number): Promise<Calificacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await calificacionRepository.getByPublicacionId(idPublicacion)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener calificaciones por publicación'
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
    getByServicioId,
    getByPublicacionId
  }
}
