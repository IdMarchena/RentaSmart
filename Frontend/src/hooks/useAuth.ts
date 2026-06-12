import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuthContext } from '../context/AuthContext'
import type { Usuario } from '../types/entities'
import { DATA_SOURCE } from '@/api'
import { backendLogin, backendLogout, backendSignup } from '@/api/authApi'
import type { JsonResponse } from '@/api/types'

interface SignupData {
  nombre: string
  correo: string
  clave: string
  cedula: string
  telefono: string
  rol: string
}

// Adaptador para convertir SignupData del frontend a SignupRequest del backend
const adaptSignupData = (data: SignupData) => ({
  nombre: data.nombre,
  correo: data.correo,
  contrasenia: data.clave, // Mapear clave -> contrasenia
  cedula: data.cedula,
  cel: data.telefono, // Mapear telefono -> cel
  rol: data.rol.toUpperCase() as 'USER' | 'ADMIN' | 'ARRENDADOR' | 'ARRENDATARIO' | 'PRESTADOR_SERVICIO'
})

export const useAuth = () => {
  const navigate = useNavigate()
  const { login: contextLogin, logout: contextLogout, user, token } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (userData: SignupData) => {
    setLoading(true)
    setError(null)

    try {
      if (DATA_SOURCE === 'backend') {
        const res = (await backendSignup(adaptSignupData(userData))) as JsonResponse<any>

        if (!res?.success) {
          throw new Error(res?.message || 'Error al registrarse')
        }

        // En modo backend, el registro devuelve mensaje simple, no el usuario
        // Necesitamos obtener el usuario con /me después del registro
        alert("Registro exitoso. Por favor, inicia sesión.");
        navigate('/');  
        return { success: true }
      }

      // Flujo original de Supabase
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
      if (DATA_SOURCE === 'backend') {
        const res = (await backendLogin({ username: email, password })) as JsonResponse<any>

        if (!res?.success) {
          throw new Error(res?.message || 'Error al iniciar sesión')
        }

        // En modo backend el JWT vive en cookie HttpOnly, no se guarda token en JS.
        // Guardamos solo el usuario para saber que hay sesión.
        contextLogin(res.data as Usuario, null)
        navigate('/')
        
        return { success: true }
      }

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
    if (DATA_SOURCE === 'backend') {
      try {
        await backendLogout()
      } catch {
        // Si falla el logout del backend igual limpiamos el estado local
      }
    } else {
      await supabase.auth.signOut()
    }
    contextLogout()
    navigate('/login')
  }

  const updateProfile = async (profileData: any) => {
    setLoading(true)
    setError(null)

    try {
      const { data: profile, error: profileError } = await supabase
        .from('usuarios')
        .update(profileData)
        .eq('id', user?.id)
        .select()
        .single()

      if (profileError) {
        console.error('Error al actualizar:', profileError)
        throw profileError
      }

      if (!profile) {
        console.error('No se recibió perfil actualizado')
        throw new Error('Perfil no encontrado')
      }

      console.log('Perfil actualizado:', profile)
      contextLogin(profile as Usuario, token as string)

      return { success: true }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar el perfil'
      console.error('Error en updateProfile:', errorMessage, err)
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile
  }
}