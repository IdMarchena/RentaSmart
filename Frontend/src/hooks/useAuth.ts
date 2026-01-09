import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuthContext } from '../context/AuthContext'
import type { Usuario } from '../types/entities'

interface SignupData {
  nombre: string
  correo: string
  clave: string
  cedula: string
  telefono: string
  rol: string
}

export const useAuth = () => {
  const navigate = useNavigate()
  const { login: contextLogin, logout: contextLogout } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (userData: SignupData) => {
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.correo,
        password: userData.clave,
        options: {
          data: {
            nombre: userData.nombre,
            cedula: userData.cedula,
            telefono: userData.telefono,
          },
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('No se pudo crear el usuario')

      const { error: profileError } = await supabase.from('usuarios').insert({
        id: authData.user.id,
        nombre: userData.nombre,
        correo: userData.correo,
        cedula: userData.cedula,
        telefono: userData.telefono,
        rol: userData.rol.toLowerCase() as any,
        estado: 'activo',
      })

      if (profileError) throw profileError

      const { data: profile } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profile && authData.session) {
        contextLogin(profile as Usuario, authData.session.access_token)
        navigate('/')
      }

      return { success: true }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al registrarse'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        })

      if (authError) throw authError
      if (!authData.user) throw new Error('Error al iniciar sesión')

      const { data: profile, error: profileError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) throw profileError
      if (!profile) throw new Error('Perfil no encontrado')

      if (profile.estado === 'bloqueado') {
        await supabase.auth.signOut()
        throw new Error('Tu cuenta ha sido bloqueada. Contacta al administrador.')
      }

      if (profile.estado === 'inactivo') {
        await supabase.auth.signOut()
        throw new Error('Tu cuenta está inactiva. Contacta al administrador.')
      }

      contextLogin(profile as Usuario, authData.session.access_token)
      navigate('/')

      return { success: true }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al iniciar sesión'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    contextLogout()
    navigate('/login')
  }

  return {
    loading,
    error,
    login,
    signup,
    logout,
  }
}