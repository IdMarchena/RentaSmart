import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface UserSearchResult {
    id: string
    nombre: string
    correo: string
    cedula?: string
    telefono?: string
    rol: string
}

export const useUsers = () => {
    const [users, setUsers] = useState<UserSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Buscar usuarios por correo o nombre
    const searchUsers = async (query: string) => {
        if (!query || query.length < 3) {
            setUsers([])
            return { success: true, data: [] }
        }

        setLoading(true)
        setError(null)

        try {
            const { data, error: fetchError } = await supabase
                .from('usuarios')
                .select('id, nombre, correo, cedula, telefono, rol')
                .or(`correo.ilike.%${query}%,nombre.ilike.%${query}%,cedula.ilike.%${query}%`)
                .eq('estado', 'activo')
                .limit(10)

            if (fetchError) throw fetchError

            const userResults: UserSearchResult[] = (data || []).map(user => ({
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                cedula: user.cedula || undefined,
                telefono: user.telefono || undefined,
                rol: user.rol
            }))

            setUsers(userResults)
            return { success: true, data: userResults }
        } catch (err: any) {
            setError(err.message)
            return { success: false, error: err.message, data: [] }
        } finally {
            setLoading(false)
        }
    }

    // Obtener usuario por ID
    const getUserById = async (id: string) => {
        try {
            const { data, error: fetchError } = await supabase
                .from('usuarios')
                .select('id, nombre, correo, cedula, telefono, rol')
                .eq('id', id)
                .single()

            if (fetchError) throw fetchError

            const userResult: UserSearchResult = {
                id: data.id,
                nombre: data.nombre,
                correo: data.correo,
                cedula: data.cedula || undefined,
                telefono: data.telefono || undefined,
                rol: data.rol
            }

            return { success: true, data: userResult }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Obtener todos los usuarios activos
    const getAllUsers = async () => {
        setLoading(true)
        try {
            const { data, error: fetchError } = await supabase
                .from('usuarios')
                .select('id, nombre, correo, cedula, rol')
                .eq('estado', 'activo')
                .order('nombre')

            if (fetchError) throw fetchError

            const userResults: UserSearchResult[] = (data || []).map(user => ({
                id: user.id,
                nombre: user.nombre,
                correo: user.correo,
                cedula: user.cedula || undefined,
                rol: user.rol
            }))

            setUsers(userResults)
            return { success: true, data: userResults }
        } catch (err: any) {
            setError(err.message)
            return { success: false, error: err.message, data: [] }
        } finally {
            setLoading(false)
        }
    }

    return {
        users,
        loading,
        error,
        searchUsers,
        getUserById,
        getAllUsers,
    }
}

export type { UserSearchResult }
