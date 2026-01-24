import { useState } from 'react'
import { inmuebleRepository } from '@/repositories'
import type { Inmueble } from '@/types/entities'

export const useInmuebles = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Inmueble[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await inmuebleRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener inmuebles'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Inmueble | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await inmuebleRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener inmueble'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Inmueble, 'id'>): Promise<Inmueble> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await inmuebleRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear inmueble'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Inmueble>): Promise<Inmueble> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await inmuebleRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar inmueble'
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
      await inmuebleRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar inmueble'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos de filtrado
  const getByUbicacion = async (ubicacionId: number): Promise<Inmueble[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await inmuebleRepository.getByUbicacion(ubicacionId)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al filtrar por ubicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByTipo = async (tipo: string): Promise<Inmueble[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await inmuebleRepository.getByTipo(tipo)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al filtrar por tipo'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const cambiarEstado = async (id: number, estado: string): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await inmuebleRepository.cambiarEstado(id, estado)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cambiar estado'
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
    getByUbicacion,
    getByTipo,
    cambiarEstado
  }
}
