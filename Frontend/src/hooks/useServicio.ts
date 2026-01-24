import { useState } from 'react'
import { servicioRepository } from '@/repositories'
import type { Servicio } from '@/types/entitys'

export const useServicio = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener servicios'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Servicio | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<Servicio, 'id'>): Promise<Servicio> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Omit<Servicio, 'id'>): Promise<Servicio> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar servicio'
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
      await servicioRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos especializados
  const getByName = async (nombre: string): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getByName(nombre)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar servicios por nombre'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByType = async (tipo: string): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getByType(tipo)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar servicios por tipo'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByStatus = async (estado: string): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getByStatus(estado)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar servicios por estado'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByNameAndPrice = async (nombre: string, precio: number): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getByNameAndPrice(nombre, precio)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar servicios por nombre y precio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const changeServiceState = async (id: number, estado: string): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await servicioRepository.changeServiceState(id, estado)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cambiar estado del servicio'
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
    getByName,
    getByType,
    getByStatus,
    getByNameAndPrice,
    changeServiceState
  }
}
