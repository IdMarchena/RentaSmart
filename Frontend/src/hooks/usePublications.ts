import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Publicacion, Inmueble } from '../types/entities'

export interface PublicacionCompleta extends Publicacion {
  inmueble?: Inmueble
  multimedia?: Array<{
    id: number
    url: string
    tipo: string
    es_portada: boolean
    orden: number
  }>
}

export const usePublications = () => {
  const [publications, setPublications] = useState<PublicacionCompleta[]>([])
  const [publicationsHome, setPublicationsHome] = useState<PublicacionCompleta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getPublications = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('publicaciones')
        .select(`
          *,
          inmueble:inmuebles(*),
          multimedia:multimedia_publicaciones(*)
        `)
        .eq('estado', 'publicada')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setPublications(data || [])
    } catch (err: any) {
      setError(err.message || 'Error al cargar publicaciones')
    } finally {
      setLoading(false)
    }
  }

  const getPublicationsHome = async () => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('publicaciones')
        .select(`
          *,
          inmueble:inmuebles(*),
          multimedia:multimedia_publicaciones(*)
        `)
        .eq('estado', 'publicada')
        .order('created_at', { ascending: false })
        .limit(6)

      if (fetchError) throw fetchError

      setPublicationsHome(data || [])
    } catch (err: any) {
      setError(err.message || 'Error al cargar publicaciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPublications()
    getPublicationsHome()
  }, [])

  const createPublication = async (publicationData: {
    inmueble: Partial<Inmueble>
    publicacion: Partial<Publicacion>
    imagenes?: File[]
  }) => {
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Debes iniciar sesión')

      // 1. Crear el inmueble
      const { data: inmuebleData, error: inmuebleError } = await supabase
        .from('inmuebles')
        .insert({
          ...publicationData.inmueble,
          propietario_id: user.id,
          estado: 'disponible',
        })
        .select()
        .single()

      if (inmuebleError) throw inmuebleError

      // 2. Crear la publicación
      const { data: publicacionData, error: publicacionError } = await supabase
        .from('publicaciones')
        .insert({
          inmueble_id: inmuebleData.id,
          usuario_id: user.id,
          titulo: publicationData.publicacion.titulo,
          descripcion: publicationData.publicacion.descripcion,
          estado: publicationData.publicacion.estadoPublicacion || 'borrador',
          fecha_publicacion: publicationData.publicacion.estadoPublicacion === 'publicada'
            ? new Date().toISOString()
            : null,
          vistas: 0,
          clicks: 0,
        })
        .select()
        .single()

      if (publicacionError) throw publicacionError

      // 3. Subir imágenes si hay
      if (publicationData.imagenes && publicationData.imagenes.length > 0) {
        for (let i = 0; i < publicationData.imagenes.length; i++) {
          const file = publicationData.imagenes[i]
          const fileExt = file.name.split('.').pop()
          const fileName = `${inmuebleData.id}_${Date.now()}_${i}.${fileExt}`

          // Subir a Storage
          const { error: uploadError } = await supabase.storage
            .from('publicaciones')
            .upload(fileName, file)

          if (uploadError) throw uploadError

          // Obtener URL pública
          const { data: urlData } = supabase.storage
            .from('publicaciones')
            .getPublicUrl(fileName)

          // Guardar en multimedia_publicaciones
          await supabase.from('multimedia_publicaciones').insert({
            publicacion_id: publicacionData.id,
            url: urlData.publicUrl,
            tipo: 'imagen',
            orden: i,
            es_portada: i === 0,
          })
        }
      }

      // Recargar publicaciones
      await getPublications()

      return { success: true, data: publicacionData }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al crear publicación'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const updatePublication = async (
    publicationId: number,
    updates: Partial<Publicacion>
  ) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: updateError } = await supabase
        .from('publicaciones')
        .update(updates)
        .eq('id', publicationId)
        .select()
        .single()

      if (updateError) throw updateError

      setPublications((prev) =>
        prev.map((pub) => (pub.id === publicationId ? { ...pub, ...data } : pub))
      )

      return { success: true, data }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al actualizar publicación'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const deletePublication = async (publicationId: number) => {
    setLoading(true)
    setError(null)

    try {
      const { error: deleteError } = await supabase
        .from('publicaciones')
        .delete()
        .eq('id', publicationId)

      if (deleteError) throw deleteError

      setPublications((prev) => prev.filter((pub) => pub.id !== publicationId))
      return { success: true }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al eliminar publicación'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const getPublicationById = async (publicationId: number) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('publicaciones')
        .select(`
          *,
          inmueble:inmuebles(*),
          multimedia:multimedia_publicaciones(*),
          usuario:usuarios(nombre, telefono, correo, avatar_url)
        `)
        .eq('id', publicationId)
        .single()

      if (fetchError) throw fetchError

      // Incrementar vistas
      await supabase
        .from('publicaciones')
        .update({ vistas: (data.vistas || 0) + 1 })
        .eq('id', publicationId)

      return { success: true, data }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al obtener publicación'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const getPublicationsByUser = async (userId: string) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('publicaciones')
        .select(`
          *,
          inmueble:inmuebles(*),
          multimedia:multimedia_publicaciones(*)
        `)
        .eq('usuario_id', userId)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setPublications(data || [])
      return { success: true, data }
    } catch (err: any) {
      const errorMsg = err.message || 'Error al obtener publicaciones del usuario'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }


  const getCalificaciones = async (publicacionId: number) => {
    try {
      const { data: calificaciones, error: fetchError } = await supabase
        .from('calificaciones')
        .select('*')
        .eq('publicacion_id', publicacionId)
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Error al obtener calificaciones:', fetchError)
        throw fetchError
      }

      if (!calificaciones || calificaciones.length === 0) {
        return { success: true, data: [] }
      }

      const usuarioIds = [...new Set(calificaciones.map((cal: any) => cal.usuario_id).filter(Boolean))]

      if (usuarioIds.length === 0) {
        return { success: true, data: calificaciones }
      }

      const { data: usuarios, error: usuariosError } = await supabase
        .from('usuarios')
        .select('id, nombre')
        .in('id', usuarioIds)

      if (usuariosError) {
        console.error('Error al obtener usuarios:', usuariosError)
        return { success: true, data: calificaciones }
      }

      const calificacionesConUsuario = calificaciones.map((cal: any) => ({
        ...cal,
        usuario: usuarios?.find((u: any) => u.id === cal.usuario_id) || null
      }))

      return { success: true, data: calificacionesConUsuario }
    } catch (err: any) {
      console.error('Error en getCalificaciones:', err)
      return { success: false, error: err.message }
    }
  }

  const createCalificacion = async (
    publicacionId: number,
    usuarioId: string,
    puntaje: number,
    comentario: string
  ) => {
    try {
      const { data: existing } = await supabase
        .from('calificaciones')
        .select('id')
        .eq('publicacion_id', publicacionId)
        .eq('usuario_id', usuarioId)
        .single()

      if (existing) {
        return { success: false, error: 'Ya has calificado esta publicación' }
      }

      const { data, error: insertError } = await supabase
        .from('calificaciones')
        .insert({
          publicacion_id: publicacionId,
          usuario_id: usuarioId,
          puntaje,
          comentario,
        })
        .select()
        .single()

      if (insertError) throw insertError

      return { success: true, data }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  const getPromedioCalificacion = async (publicacionId: number) => {
    try {
      const { data, error: fetchError } = await supabase
        .from('calificaciones')
        .select('puntaje')
        .eq('publicacion_id', publicacionId)

      if (fetchError) throw fetchError

      if (!data || data.length === 0) {
        return { success: true, promedio: 0, total: 0 }
      }

      const promedio = data.reduce((acc, cal) => acc + cal.puntaje, 0) / data.length

      return { success: true, promedio: Math.round(promedio * 10) / 10, total: data.length }
    } catch (err: any) {
      return { success: false, error: err.message, promedio: 0, total: 0 }
    }
  }



  return {
    publications,
    publicationsHome,
    loading,
    error,
    getPublications,
    createPublication,
    updatePublication,
    deletePublication,
    getPublicationById,
    getPublicationsByUser,
    getCalificaciones,
    createCalificacion,
    getPromedioCalificacion,
  }
}