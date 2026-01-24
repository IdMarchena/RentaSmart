import { supabase } from '@/lib/supabase'
import type { UsuarioRegistrado } from '@/types/entities'
import type { 
  UsuarioRegistradoRepository, 
  UsuarioRegistradoSearchResult 
} from './UsuarioRegistradoRepository'

export class SupabaseUsuarioRegistradoRepository implements UsuarioRegistradoRepository {
  async getAll(): Promise<UsuarioRegistrado[]> {
    const { data, error } = await supabase
      .from('usuarios_registrados')
      .select('*')
      .order('fechaRegistro', { ascending: false })

    if (error) throw error
    return data || []
  }

  async getById(id: number): Promise<UsuarioRegistrado | null> {
    const { data, error } = await supabase
      .from('usuarios_registrados')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  }

  async getByUbicacion(ubicacion: string): Promise<UsuarioRegistradoSearchResult[]> {
    const { data, error } = await supabase
      .from('usuarios_registrados')
      .select('id, nombre, correo, telefono, ubicacion')
      .ilike('ubicacion', `%${ubicacion}%`)
      .order('nombre')

    if (error) throw error
    return data || []
  }

  async create(data: Omit<UsuarioRegistrado, 'id'>): Promise<UsuarioRegistrado> {
    const { data: result, error } = await supabase
      .from('usuarios_registrados')
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async update(id: number, data: Partial<UsuarioRegistrado>): Promise<UsuarioRegistrado> {
    const { data: result, error } = await supabase
      .from('usuarios_registrados')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return result
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from('usuarios_registrados')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}
