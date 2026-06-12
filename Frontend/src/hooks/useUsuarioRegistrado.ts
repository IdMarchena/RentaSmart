import { useState, useEffect } from 'react'
import { usuarioRegistradoRepository } from '@/repositories'
import type { UsuarioRegistrado, UsuarioRegistradoSearchResult } from '@/types/entities'

export const useUsuarioRegistrado = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAll = async (): Promise<UsuarioRegistrado[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await usuarioRegistradoRepository.getAll()
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener usuarios registrados'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getById = async (id: number): Promise<UsuarioRegistrado | null> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await usuarioRegistradoRepository.getById(id)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener usuario registrado'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const getByUbicacion = async (ubicacion: string): Promise<UsuarioRegistradoSearchResult[]> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await usuarioRegistradoRepository.getByUbicacion(ubicacion)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al buscar por ubicación'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const create = async (data: Omit<UsuarioRegistrado, 'id'>): Promise<UsuarioRegistrado> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await usuarioRegistradoRepository.create(data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear usuario registrado'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: number, data: Partial<UsuarioRegistrado>): Promise<UsuarioRegistrado> => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await usuarioRegistradoRepository.update(id, data)
      return result
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar usuario registrado'
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
      await usuarioRegistradoRepository.delete(id)
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar usuario registrado'
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
    getByUbicacion,
    create,
    update,
    remove
  }
}

// Hook para lista de usuarios con estado local
export const useUsuarioRegistradoList = () => {
  const [usuarios, setUsuarios] = useState<UsuarioRegistrado[]>([])
  const { loading, error, getAll } = useUsuarioRegistrado()

  const loadUsuarios = async () => {
    try {
      const data = await getAll()
      setUsuarios(data)
    } catch (err) {
      // El error ya se maneja en el hook base
    }
  }

  useEffect(() => {
    loadUsuarios()
  }, [])

  return {
    usuarios,
    loading,
    error,
    refetch: loadUsuarios
  }
}
