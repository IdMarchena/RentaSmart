import { supabase } from '@/lib/supabase'
import type { Publicacion } from '@/types/entities'
import type { PublicacionRepository } from './PublicacionRepository'

export class SupabasePublicacionRepository implements PublicacionRepository {
  async getAll(): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getById(id: number): Promise<Publicacion | null> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  async create(data: Omit<Publicacion, 'id'>): Promise<Publicacion> {
    const { data: result, error } = await supabase
      .from('publicaciones')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async update(id: number, data: Partial<Publicacion>): Promise<Publicacion> {
    const { data: result, error } = await supabase
      .from('publicaciones')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('publicaciones')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async getByEstado(estado: string): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('estadoPublicacion', estado)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByTitulo(titulo: string): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .ilike('titulo', `%${titulo}%`)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByPrecioMenor(precio: number): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .lte('precio', precio)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByPrecioMayor(precio: number): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .gte('precio', precio)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByPrecioRango(precioMin: number, precioMax: number): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .gte('precio', precioMin)
      .lte('precio', precioMax)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByNombreInmueble(nombre: string): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .ilike('inmueble.nombre', `%${nombre}%`)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByUbicacionInmueble(ubicacion: string): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .ilike('inmueble.ubicacion.nombre', `%${ubicacion}%`)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByEstratoInmueble(estrato: string): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('inmueble.estrato', parseInt(estrato))
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByUbicacionYEstado(ubicacionId: number, estado: string): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('inmueble.idUbicacion', ubicacionId)
      .eq('estadoPublicacion', estado)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByNombreYEstrato(nombre: string, estrato: number): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .ilike('inmueble.nombre', `%${nombre}%`)
      .eq('inmueble.estrato', estrato)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByIdArrendatario(id: number): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('inmueble.idArrendatario', id)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getByIdUsuario(id: number): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('idUsuario', id)
      .order('fechaPublicacion', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getTop6(): Promise<Publicacion[]> {
    const { data, error } = await supabase
      .from('publicaciones')
      .select(`
        *,
        inmueble:inmueble_id (*),
        usuario:usuario_id (*),
        multimedias (*)
      `)
      .eq('estadoPublicacion', 'publicada')
      .order('fechaPublicacion', { ascending: false })
      .limit(6)

    if (error) throw error
    return data || []
  }

  async cambiarEstado(id: number, estado: string): Promise<void> {
    const { error } = await supabase
      .from('publicaciones')
      .update({ estadoPublicacion: estado })
      .eq('id', id)

    if (error) throw error
  }
}
