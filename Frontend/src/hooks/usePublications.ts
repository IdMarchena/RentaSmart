import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Publicacion, Inmueble } from '../types/entities'

interface PublicacionCompleta extends Publicacion {
  inmueble?: Inmueble
  multimedia?: Array<{
    id: number
    url: string
    tipo: string
    es_portada: boolean
  }>
}

export const usePublications = () => {
  const [publications, setPublications] = useState<PublicacionCompleta[]>([])
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

  useEffect(() => {
    getPublications()
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
          estado: publicationData.publicacion.estado || 'borrador',
          fecha_publicacion: publicationData.publicacion.estado === 'publicada' 
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

  return {
    publications,
    loading,
    error,
    getPublications,
    createPublication,
    updatePublication,
    deletePublication,
    getPublicationById,
    getPublicationsByUser,
  }
}