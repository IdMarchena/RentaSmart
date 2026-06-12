import { useState } from 'react'
import { ubicacionRepository, googleMapsUbicacionRepository, backendUbicacionRepository } from '@/repositories'
import type { Ubicacion } from '@/types/entitys'

export const useUbicacion = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Métodos usando el repositorio por defecto (Google Maps)
  const create = async (data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await ubicacionRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear ubicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<Ubicacion | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await ubicacionRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener ubicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await ubicacionRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar ubicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAll = async (): Promise<Ubicacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await ubicacionRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener ubicaciones'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByEstado = async (estado: string): Promise<Ubicacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await ubicacionRepository.getByEstado(estado)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener ubicaciones por estado'
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
      await ubicacionRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar ubicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos específicos para Google Maps (mantienen funcionalidad actual)
  const createFromGooglePlace = async (place: google.maps.places.PlaceResult): Promise<Ubicacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await googleMapsUbicacionRepository.createFromGooglePlace(place)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear ubicación desde Google Place'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const searchByCoordinates = async (lat: number, lng: number, radius?: number): Promise<Ubicacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await googleMapsUbicacionRepository.searchByCoordinates(lat, lng, radius)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar por coordenadas'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos específicos para Backend (opcionales)
  const createFromBackend = async (data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await backendUbicacionRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear ubicación en backend'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getAllFromBackend = async (): Promise<Ubicacion[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await backendUbicacionRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener ubicaciones del backend'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    // Métodos por defecto (Google Maps)
    create,
    getById,
    update,
    getAll,
    getByEstado,
    remove,
    // Métodos específicos de Google Maps (funcionalidad actual)
    createFromGooglePlace,
    searchByCoordinates,
    // Métodos específicos de Backend (opcionales)
    createFromBackend,
    getAllFromBackend
  }
}
