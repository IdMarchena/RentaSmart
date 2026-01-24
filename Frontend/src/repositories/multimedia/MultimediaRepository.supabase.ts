import { supabase } from '@/lib/supabase'
import type { Multimedia } from '@/types/entitys'
import type { MultimediaRepository } from './MultimediaRepository'

export class SupabaseMultimediaRepository implements MultimediaRepository {
  async getAll(): Promise<Multimedia[]> {
    const { data, error } = await supabase
      .from('multimedias')
      .select(`
        *,
        publicacion:id_publicacion (*)
      `)
      .order('orden', { ascending: true })

    if (error) throw error
    return data || []
  }

  async getById(id: number): Promise<Multimedia | null> {
    const { data, error } = await supabase
      .from('multimedias')
      .select(`
        *,
        publicacion:id_publicacion (*)
      `)
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  async create(data: Omit<Multimedia, 'id'>): Promise<Multimedia> {
    const { data: result, error } = await supabase
      .from('multimedias')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async update(id: number, data: Partial<Multimedia>): Promise<Multimedia> {
    const { data: result, error } = await supabase
      .from('multimedias')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('multimedias')
      .delete()
      .eq('id', id)

    if (error) throw error
  }

  async getByPublicacion(publicacionId: number): Promise<Multimedia[]> {
    const { data, error } = await supabase
      .from('multimedias')
      .select(`
        *,
        publicacion:id_publicacion (*)
      `)
      .eq('idPublicacion', publicacionId)
      .order('orden', { ascending: true })

    if (error) throw error
    return data || []
  }

  async getByTipo(tipo: string): Promise<Multimedia[]> {
    const { data, error } = await supabase
      .from('multimedias')
      .select(`
        *,
        publicacion:id_publicacion (*)
      `)
      .eq('tipo', tipo)
      .order('orden', { ascending: true })

    if (error) throw error
    return data || []
  }
}
