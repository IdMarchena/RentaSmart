import { supabase } from '@/lib/supabase';
import type { UsuarioResumen } from '@/types/entities';
import type { UsuariosRepository } from './UsuariosRepository';

export const usuariosRepositorySupabase: UsuariosRepository = {
  async searchUsers(query: string) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nombre, correo, cedula, telefono, rol')
      .or(`correo.ilike.%${query}%,nombre.ilike.%${query}%,cedula.ilike.%${query}%`)
      .eq('estado', 'activo')
      .limit(10);

    if (error) {
      return { success: false as const, error: error.message, data: [] as UsuarioResumen[] };
    }

    const userResults: UsuarioResumen[] = (data || []).map((user: any) => ({
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      cedula: user.cedula || undefined,
      telefono: user.telefono || undefined,
      rol: user.rol,
    }));

    return { success: true as const, data: userResults };
  },

  async getUserById(id: string) {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nombre, correo, cedula, telefono, rol')
      .eq('id', id)
      .single();

    if (error) {
      return { success: false as const, error: error.message };
    }

    const userResult: UsuarioResumen = {
      id: data.id,
      nombre: data.nombre,
      correo: data.correo,
      cedula: data.cedula || undefined,
      telefono: data.telefono || undefined,
      rol: data.rol,
    };

    return { success: true as const, data: userResult };
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nombre, correo, cedula, rol')
      .eq('estado', 'activo')
      .order('nombre');

    if (error) {
      return { success: false as const, error: error.message, data: [] as UsuarioResumen[] };
    }

    const userResults: UsuarioResumen[] = (data || []).map((user: any) => ({
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      cedula: user.cedula || undefined,
      rol: user.rol,
    }));

    return { success: true as const, data: userResults };
  },
};
