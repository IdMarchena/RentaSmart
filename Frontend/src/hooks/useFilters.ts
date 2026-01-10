import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Publicacion, Servicio } from '../types/entities'

export interface PublicationFilters {
  ubicacion?: string
  tipoInmueble?: string
  precioMinimo?: number
  precioMaximo?: number
}

export interface ServiceFilters {
  nombre?: string
  precioMinimo?: number
  precioMaximo?: number
}

export const useFilters = () => {
  const [filtersPublications, setFiltersPublications] = useState<Publicacion[]>([])
  const [filtersServices, setFiltersServices] = useState<Servicio[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)


  const getFilteredPublications = async (filters: PublicationFilters) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('publicaciones')
        .select(`
          *,
          inmueble:inmuebles(*),
          multimedia:multimedia_publicaciones(*)
        `)
        .eq('estado', 'publicada')

      // Filtrar por ubicación (ciudad)
      if (filters.ubicacion) {
        const { data: inmuebles } = await supabase
          .from('inmuebles')
          .select('id')
          .ilike('ciudad', `%${filters.ubicacion}%`)

        if (inmuebles && inmuebles.length > 0) {
          const inmuebleIds = inmuebles.map((i) => i.id)
          query = query.in('inmueble_id', inmuebleIds)
        } else {
          setFiltersPublications([])
          setLoading(false)
          return { success: true, data: [] }
        }
      }

      // Filtrar por tipo de inmueble
      if (filters.tipoInmueble) {
        const { data: inmuebles } = await supabase
          .from('inmuebles')
          .select('id')
          .eq('tipo', filters.tipoInmueble.toLowerCase())

        if (inmuebles && inmuebles.length > 0) {
          const inmuebleIds = inmuebles.map((i) => i.id)
          query = query.in('inmueble_id', inmuebleIds)
        } else {
          setFiltersPublications([])
          setLoading(false)
          return { success: true, data: [] }
        }
      }

      const { data, error: fetchError } = await query.order('created_at', {
        ascending: false,
      })

      if (fetchError) throw fetchError

      // Filtrar por precio en el cliente (más fácil que en la query)
      let filteredData = data || []

      // Solo aplicar filtro de precio si hay valores válidos (mayor a 0)
      const hasPrecioMin = filters.precioMinimo && filters.precioMinimo > 0
      const hasPrecioMax = filters.precioMaximo && filters.precioMaximo > 0

      if (hasPrecioMin || hasPrecioMax) {
        filteredData = filteredData.filter((pub: any) => {
          const precio = pub.inmueble?.precio_mensual || 0
          const cumpleMin = !hasPrecioMin || precio >= filters.precioMinimo!
          const cumpleMax = !hasPrecioMax || precio <= filters.precioMaximo!
          return cumpleMin && cumpleMax
        })
      }

      setFiltersPublications(filteredData)
      return { success: true, data: filteredData }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al filtrar publicaciones'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const getFilteredServices = async (filters: ServiceFilters) => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('servicios')
        .select(`
          *,
          prestador:usuarios(nombre, telefono)
        `)
        .eq('estado', 'activo')

      if (filters.nombre) {
        query = query.ilike('nombre', `%${filters.nombre}%`)
      }

      if (filters.precioMinimo !== undefined) {
        query = query.gte('precio', filters.precioMinimo)
      }

      if (filters.precioMaximo !== undefined) {
        query = query.lte('precio', filters.precioMaximo)
      }

      const { data, error: fetchError } = await query.order('created_at', {
        ascending: false,
      })

      if (fetchError) throw fetchError

      setFiltersServices(data || [])
      return { success: true, data }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al filtrar servicios'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setFiltersPublications([])
    setFiltersServices([])
    setError(null)
  }

  return {
    filtersPublications,
    filtersServices,
    loading,
    error,
    getFilteredPublications,
    getFilteredServices,
    clearFilters,
  }
}