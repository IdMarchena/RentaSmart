import { useCallback, useMemo, useState } from 'react'
import { BackendFavoritoRepository } from '@/repositories/Favorito/FavoritoBackendRepository'
import type { Favorito } from '@/types/entitys'
import {FavoritoService} from '@/services/FavoritoService'
import {PublicacionService} from '@/services/PublicacionService'
import {BackendPublicacionRepository} from '@/repositories/publicaciones/PublicacionRepository.backend'
import {BackendInmuebleRepository} from '@/repositories/inmuebles/InmuebleRepository.backend'
import {BackendUbicacionRepository} from '@/repositories/Ubicacion/UbicacionBackendRepository'
import {BackendCalificacionRepository} from '@/repositories/Calificacion/CalificacionRepository'
import {BackendMultimediaRepository} from '@/repositories/multimedia/MultimediaRepository.backend'
import {CalificacionService} from '@/services/CalificacionService'
import {usuariosRepository} from '@/repositories/usuarios'
import {BackendServicioRepository} from '@/repositories/Servicio/ServicioBackendRepository'

export const useFavorito = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [favoritos, setFavoritos] = useState<Favorito[]>([])

  const servicios = useMemo(() => {
    const pubRepo = new BackendPublicacionRepository()
    const inmuebleRepo = new BackendInmuebleRepository()
    const ubicacionRepo = new BackendUbicacionRepository()
    const califRepo = new BackendCalificacionRepository()
    const multiRepo = new BackendMultimediaRepository()
    const serviceRepo = new BackendServicioRepository()
    const favoritoRepository = new BackendFavoritoRepository()

    const califService = new CalificacionService(
          califRepo as any,
          serviceRepo as any,
          pubRepo as any
    )
    const publicacionService = new PublicacionService(    
        pubRepo as any, 
        inmuebleRepo as any,
        usuariosRepository as any,
        ubicacionRepo as any,
        califRepo as any,
        multiRepo as any,
        califService as any
    )
    
    const favoritoService = new FavoritoService(
      favoritoRepository as any, 
      publicacionService as any, 
      pubRepo as any
    )

    return {
      favoritoService,
      favoritoRepository
    };
  }, []);

  const getAll = useCallback(async (): Promise<Favorito[]> => {
    setLoading(true)
    setError(null)    
    try {
      const result = await servicios.favoritoRepository.getAll()
      const favoritosFull = await Promise.all(result.map(fav => servicios.favoritoService.getFullFavorito(fav.id)))
      setFavoritos(favoritosFull)
      return favoritosFull
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener favoritos'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [servicios])

  const getById = useCallback(async (id: number): Promise<Favorito | null> => {
    setLoading(true)
    setError(null)    
    try {
      const result = await servicios.favoritoRepository.getById(id)
      if (result) {
        const favoritoFull = await servicios.favoritoService.getFullFavorito(result.id)
        setFavoritos([favoritoFull])
        return favoritoFull
      }
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener favorito'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [servicios])

  const create = useCallback(async (data: Omit<Favorito, 'id'>): Promise<Favorito> => {
    setLoading(true)
    setError(null)
    try {
      const result = await servicios.favoritoRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear favorito'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [servicios])

  const remove = useCallback(async (id: number): Promise<void> => {
    setLoading(true)
    setError(null)
    
    try {
      await servicios.favoritoRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar favorito'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [servicios])

  const getByUsuarioId = useCallback(async (idUsuario: number): Promise<Favorito[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await servicios.favoritoRepository.getByUsuarioId(idUsuario)
      if(result){
        const favoritosFull = await Promise.all(result.map(fav => servicios.favoritoService.getFullFavorito(fav.id)))
        setFavoritos(favoritosFull)
        return favoritosFull
      }
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener favoritos por usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [servicios])

  return {
    loading,
    error,
    favoritos,
    getAll,
    getById,
    create,
    remove,
    getByUsuarioId
  }
}
