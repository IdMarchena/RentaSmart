import { useState } from 'react'
import { usuariosRepository } from '@/repositories'
import type { UsuarioResumen } from '@/types/entities'

type UserSearchResult = UsuarioResumen

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
            const result = await usuariosRepository.searchUsers(query)
            if (!result.success) {
                throw new Error(result.error)
            }

            setUsers(result.data)
            return { success: true, data: result.data }
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
            const result = await usuariosRepository.getUserById(id)
            if (!result.success) {
                throw new Error(result.error)
            }

            return { success: true, data: result.data }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Obtener todos los usuarios activos
    const getAllUsers = async () => {
        setLoading(true)
        try {
            const result = await usuariosRepository.getAllUsers()
            if (!result.success) {
                throw new Error(result.error)
            }

            setUsers(result.data)
            return { success: true, data: result.data }
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
