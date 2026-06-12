import { useState } from 'react'
import { BackendServicioRepository } from '@/repositories/Servicio/ServicioBackendRepository'
import type { Servicio } from '@/types/entitys'
import { BackendUbicacionRepository } from '@/repositories/Ubicacion/UbicacionBackendRepository';
import { BackendCalificacionRepository } from '@/repositories/Calificacion/CalificacionRepository';
import { CalificacionService } from '@/services/CalificacionService';
import { ServicioService } from '@/services/ServicioService';
import { BackendPublicacionRepository } from '@/repositories/publicaciones/PublicacionRepository.backend';
export const useServicio = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [servicios, setServicios] = useState<Servicio[]>([])

  

  const ubicacionRepository = new BackendUbicacionRepository();
  const calificacionRepository = new BackendCalificacionRepository();
  const servicioRepository = new BackendServicioRepository();
  const pubRepository = new BackendPublicacionRepository();

  const calificacionService = new CalificacionService(
    calificacionRepository,
    servicioRepository,
    pubRepository
  )

  const ServicioServices = new ServicioService(
    ubicacionRepository,
    calificacionRepository,
    servicioRepository,
    calificacionService
  )

  const getAll = async (): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getAll()
      const fullServicios = await Promise.all(
        result.map(servicio => ServicioServices.getFullServicio(servicio.id))
      );
      setServicios(fullServicios.filter(s => s !== null) as Servicio[])
      return fullServicios.filter(s => s !== null) as Servicio[]
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener servicios'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }
    const getByUserId = async (userId: number): Promise<Servicio[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicioRepository.getByUserId(userId)
      const fullServicios = await Promise.all(
        result.map(servicio => ServicioServices.getFullServicio(servicio.id))
      );
      setServicios(fullServicios.filter(s => s !== null) as Servicio[])
      return fullServicios.filter(s => s !== null) as Servicio[]
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
      const result = await ServicioServices.getFullServicio(id)
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
      const fullServicios = await Promise.all(
        result.map(servicio => ServicioServices.getFullServicio(servicio.id))
      );
      setServicios(fullServicios.filter(s => s !== null) as Servicio[])
      return fullServicios.filter(s => s !== null) as Servicio[]
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
      const fullServicios = await Promise.all(
        result.map(servicio => ServicioServices.getFullServicio(servicio.id))
      );
      setServicios(fullServicios.filter(s => s !== null) as Servicio[])
      return fullServicios.filter(s => s !== null) as Servicio[]
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
      const fullServicios = await Promise.all(
        result.map(servicio => ServicioServices.getFullServicio(servicio.id))
      );
      setServicios(fullServicios.filter(s => s !== null) as Servicio[])
      return fullServicios.filter(s => s !== null) as Servicio[]
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
      const fullServicios = await Promise.all(
        result.map(servicio => ServicioServices.getFullServicio(servicio.id))
      );
      setServicios(fullServicios.filter(s => s !== null) as Servicio[])
      return fullServicios.filter(s => s !== null) as Servicio[]
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

  const createCalificacion = async (idServicio: number, idUsuario: number, puntuacion: number, comentario: string): Promise<any> => {
    setLoading(true)
    setError(null)
    
    try {
      // Estructura igual a la de publicaciones pero para servicios
      const payload = {
        publicacion: null, // IMPORTANTE: Debe ser null para servicios
        servicio: { id: idServicio },
        usuario: { id: idUsuario },
        puntaje: puntuacion, // USAR 'puntaje' como en las publicaciones
        comentario: comentario,
        fecha: new Date().toISOString() // Enviamos formato ISO estándar
      };
      
      const result = await calificacionRepository.create(payload as any)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear calificación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    servicios,
    getAll,
    getById,
    create,
    update,
    remove,
    getByName,
    getByType,
    getByStatus,
    getByUserId,
    getByNameAndPrice,
    changeServiceState,
    createCalificacion
  }
}
