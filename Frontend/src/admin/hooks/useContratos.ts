import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import type { Contrato } from '../../types/entities'

interface ContratoCompleto extends Contrato {
    publicacion?: {
        id: number
        titulo: string
    }
    inmueble?: {
        id: number
        direccion: string
        ciudad: string
    }
    arrendador?: {
        id: string
        nombre: string
        correo: string
    }
    arrendatario?: {
        id: string
        nombre: string
        correo: string
    }
}

export const useContratos = () => {
    const [contratos, setContratos] = useState<ContratoCompleto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Obtener todos los contratos
    const getContratos = async () => {
        setLoading(true)
        setError(null)

        try {
            const { data, error: fetchError } = await supabase
                .from('contratos')
                .select(`
          *,
          publicacion:publicaciones(id, titulo),
          inmueble:inmuebles(id, direccion, ciudad),
          arrendador:usuarios!contratos_arrendador_id_fkey(id, nombre, correo),
          arrendatario:usuarios!contratos_arrendatario_id_fkey(id, nombre, correo)
        `)
                .order('created_at', { ascending: false })

            if (fetchError) throw fetchError

            setContratos(data || [])
        } catch (err: any) {
            setError(err.message || 'Error al cargar contratos')
        } finally {
            setLoading(false)
        }
    }

    // Obtener contratos por usuario (como arrendador o arrendatario)
    const getContratosByUser = async (userId: string) => {
        setLoading(true)
        setError(null)

        try {
            const { data, error: fetchError } = await supabase
                .from('contratos')
                .select(`
          *,
          publicacion:publicaciones(id, titulo),
          inmueble:inmuebles(id, direccion, ciudad),
          arrendador:usuarios!contratos_arrendador_id_fkey(id, nombre, correo),
          arrendatario:usuarios!contratos_arrendatario_id_fkey(id, nombre, correo)
        `)
                .or(`arrendador_id.eq.${userId},arrendatario_id.eq.${userId}`)
                .order('created_at', { ascending: false })

            if (fetchError) throw fetchError

            setContratos(data || [])
            return { success: true, data }
        } catch (err: any) {
            setError(err.message || 'Error al cargar contratos')
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    // Obtener un contrato por ID
    const getContratoById = async (id: number) => {
        try {
            const { data, error: fetchError } = await supabase
                .from('contratos')
                .select(`
          *,
          publicacion:publicaciones(id, titulo),
          inmueble:inmuebles(id, direccion, ciudad),
          arrendador:usuarios!contratos_arrendador_id_fkey(id, nombre, correo, telefono),
          arrendatario:usuarios!contratos_arrendatario_id_fkey(id, nombre, correo, telefono)
        `)
                .eq('id', id)
                .single()

            if (fetchError) throw fetchError

            return { success: true, data }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Crear un contrato
    const createContrato = async (contratoData: {
        publicacion_id: number
        inmueble_id: number
        arrendador_id: string
        arrendatario_id: string
        fecha_inicio: string
        fecha_fin: string
        precio_mensual: number
        deposito_seguridad: number
        dia_pago: number
        terminos_condiciones: string
        clausulas_especiales?: string
        documento_url?: string
    }) => {
        try {
            const { data, error: insertError } = await supabase
                .from('contratos')
                .insert({
                    ...contratoData,
                    estado: 'pendiente',
                })
                .select()
                .single()

            if (insertError) throw insertError

            return { success: true, data }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Actualizar un contrato
    const updateContrato = async (id: number, contratoData: Partial<Contrato>) => {
        try {
            const { data, error: updateError } = await supabase
                .from('contratos')
                .update(contratoData)
                .eq('id', id)
                .select()
                .single()

            if (updateError) throw updateError

            return { success: true, data }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Eliminar un contrato
    const deleteContrato = async (id: number) => {
        try {
            const { error: deleteError } = await supabase
                .from('contratos')
                .delete()
                .eq('id', id)

            if (deleteError) throw deleteError

            return { success: true }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Subir documento PDF
    const uploadDocumentoPDF = async (file: File, contratoId: number) => {
        try {
            console.log('📄 Iniciando upload de PDF:', { fileName: file.name, size: file.size, contratoId })

            const fileExt = file.name.split('.').pop()
            const fileName = `${contratoId}-${Date.now()}.${fileExt}`
            const filePath = `contratos/${fileName}`

            console.log('📁 Ruta del archivo:', filePath)

            // Intentar subir el archivo
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('documentos')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                console.error('❌ Error al subir archivo:', uploadError)
                throw uploadError
            }

            console.log('✅ Archivo subido exitosamente:', uploadData)

            // Obtener URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('documentos')
                .getPublicUrl(filePath)

            console.log('🔗 URL pública generada:', publicUrl)

            // Actualizar el contrato con la URL del documento
            const updateResult = await updateContrato(contratoId, { documento_url: publicUrl })

            if (!updateResult.success) {
                console.error('❌ Error al actualizar contrato con URL:', updateResult.error)
                throw new Error(updateResult.error)
            }

            console.log('✅ Contrato actualizado con URL del documento')

            return { success: true, url: publicUrl }
        } catch (err: any) {
            console.error('❌ Error en uploadDocumentoPDF:', err)
            return { success: false, error: err.message || JSON.stringify(err) }
        }
    }

    // Firmar contrato
    const firmarContrato = async (id: number, tipoFirma: 'arrendador' | 'arrendatario', firmaUrl: string) => {
        try {
            const updateData: any = {
                fecha_firma: new Date().toISOString(),
            }

            if (tipoFirma === 'arrendador') {
                updateData.firma_arrendador = firmaUrl
            } else {
                updateData.firma_arrendatario = firmaUrl
            }

            // Verificar si ambas firmas están presentes para activar el contrato
            const { data: contrato } = await supabase
                .from('contratos')
                .select('firma_arrendador, firma_arrendatario')
                .eq('id', id)
                .single()

            if (contrato) {
                const ambasFirmas = tipoFirma === 'arrendador'
                    ? firmaUrl && contrato.firma_arrendatario
                    : contrato.firma_arrendador && firmaUrl

                if (ambasFirmas) {
                    updateData.estado = 'activo'
                }
            }

            const { data, error: updateError } = await supabase
                .from('contratos')
                .update(updateData)
                .eq('id', id)
                .select()
                .single()

            if (updateError) throw updateError

            return { success: true, data }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    // Cambiar estado del contrato
    const cambiarEstadoContrato = async (id: number, nuevoEstado: Contrato['estado']) => {
        try {
            const { data, error: updateError } = await supabase
                .from('contratos')
                .update({ estado: nuevoEstado })
                .eq('id', id)
                .select()
                .single()

            if (updateError) throw updateError

            return { success: true, data }
        } catch (err: any) {
            return { success: false, error: err.message }
        }
    }

    return {
        contratos,
        loading,
        error,
        getContratos,
        getContratosByUser,
        getContratoById,
        createContrato,
        updateContrato,
        deleteContrato,
        uploadDocumentoPDF,
        firmarContrato,
        cambiarEstadoContrato,
    }
}
