import { useState } from 'react'
import { citaRepository } from '@/repositories'
import type { Cita } from '@/types/entitys'

export const useCita = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Cita[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener citas'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Cita | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener cita'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Cita, 'id'>): Promise<Cita> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear cita'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<Cita>): Promise<Cita> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar cita'
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
      await citaRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar cita'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByUsuarioId = async (idUsuario: number): Promise<Cita[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getByUsuarioId(idUsuario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener citas por usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByServicioId = async (idServicio: number): Promise<Cita[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getByServicioId(idServicio)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener citas por servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByPublicacionId = async (idPublicacion: number): Promise<Cita[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getByPublicacionId(idPublicacion)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener citas por publicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByEstado = async (estado: string): Promise<Cita[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getByEstado(estado)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener citas por estado'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByFecha = async (fecha: string): Promise<Cita[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await citaRepository.getByFecha(fecha)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener citas por fecha'
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
    getByUsuarioId,
    getByServicioId,
    getByPublicacionId,
    getByEstado,
    getByFecha
  }
}
