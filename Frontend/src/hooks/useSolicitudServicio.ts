import { useState } from 'react'
import { solicitudServicioRepository } from '@/repositories'
import type { SolicitudServicio } from '@/types/entitys'

export const useSolicitudServicio = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = async (data: Omit<SolicitudServicio, 'id'>): Promise<SolicitudServicio> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear solicitud de servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<SolicitudServicio | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitud de servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Omit<SolicitudServicio, 'id'>): Promise<SolicitudServicio> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar solicitud de servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAll = async (): Promise<SolicitudServicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitudes de servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByUsuario = async (idUsuario: number): Promise<SolicitudServicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getByUsuario(idUsuario)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitudes de servicio por usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByEstado = async (estado: string): Promise<SolicitudServicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getByEstado(estado)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitudes de servicio por estado'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByServicio = async (idServicio: number): Promise<SolicitudServicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getByServicio(idServicio)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitudes de servicio por servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByInmueble = async (idInmueble: number): Promise<SolicitudServicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getByInmueble(idInmueble)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitudes de servicio por inmueble'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByFechaBetween = async (startDate: string, endDate: string): Promise<SolicitudServicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await solicitudServicioRepository.getByFechaBetween(startDate, endDate)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener solicitudes de servicio por fecha'
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
      await solicitudServicioRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar solicitud de servicio'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    create,
    getById,
    update,
    getAll,
    getByUsuario,
    getByEstado,
    getByServicio,
    getByInmueble,
    getByFechaBetween,
    remove
  }
}
