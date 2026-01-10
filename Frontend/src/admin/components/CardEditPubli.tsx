import { useState } from 'react'
import { MapPicker } from '@/components/MapPicker'
import { usePublications } from '@/hooks/usePublications'
import { supabase } from '@/lib/supabase'
import imgUpload from '@/assets/upload.png'
import type { Publicacion, Inmueble } from '@/types/entities'

interface PublicacionCompleta extends Publicacion {
    inmueble?: Inmueble
    multimedia?: Array<{
        id: number
        url: string
        tipo: string
        es_portada: boolean
    }>
}

interface CardEditPublicProps {
    onClose?: () => void
    publicacion: PublicacionCompleta
}

export const CardEditPubli = ({ onClose, publicacion }: CardEditPublicProps) => {
    const { updatePublication, loading } = usePublications()

    const [formData, setFormData] = useState({
        tipo: (publicacion.inmueble?.tipo || 'apartamento') as 'apartamento' | 'casa' | 'habitacion',
        titulo: publicacion.titulo || '',
        descripcion: publicacion.descripcion || '',
        ciudad: publicacion.inmueble?.ciudad || '',
        departamento: publicacion.inmueble?.departamento || '',
        direccion: publicacion.inmueble?.direccion || '',
        latitud: publicacion.inmueble?.latitud || 0,
        longitud: publicacion.inmueble?.longitud || 0,
        area_total: publicacion.inmueble?.area_total || 0,
        num_habitaciones: publicacion.inmueble?.num_habitaciones || 0,
        num_banos: publicacion.inmueble?.num_banos || 0,
        num_pisos: publicacion.inmueble?.num_pisos || 0,
        capacidad_personas: publicacion.inmueble?.capacidad_personas || 0,
        amoblado: publicacion.inmueble?.amoblado || false,
        precio_mensual: publicacion.inmueble?.precio_mensual || 0,
    })

    // Estado para imágenes
    const [nuevasImagenes, setNuevasImagenes] = useState<File[]>([])
    const [nuevasImagenesPreview, setNuevasImagenesPreview] = useState<string[]>([])
    const [imagenesAEliminar, setImagenesAEliminar] = useState<number[]>([])

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleLocationSelect = (location: any) => {
        setFormData({
            ...formData,
            ciudad: location.city,
            departamento: location.department,
            direccion: location.address,
            latitud: location.lat,
            longitud: location.lng,
        })
    }

    // Manejar selección de nuevas imágenes
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const imagenesActuales = (publicacion.multimedia?.length || 0) - imagenesAEliminar.length
        const totalImagenes = imagenesActuales + nuevasImagenes.length + files.length

        if (totalImagenes > 10) {
            setError('Máximo 10 imágenes permitidas en total')
            return
        }

        setNuevasImagenes([...nuevasImagenes, ...files])
        const newPreviews = files.map((file) => URL.createObjectURL(file))
        setNuevasImagenesPreview([...nuevasImagenesPreview, ...newPreviews])
    }

    // Eliminar una nueva imagen (antes de subir)
    const removeNuevaImagen = (index: number) => {
        setNuevasImagenes(nuevasImagenes.filter((_, i) => i !== index))
        URL.revokeObjectURL(nuevasImagenesPreview[index])
        setNuevasImagenesPreview(nuevasImagenesPreview.filter((_, i) => i !== index))
    }

    // Marcar imagen existente para eliminar
    const toggleEliminarImagen = (multimediaId: number) => {
        if (imagenesAEliminar.includes(multimediaId)) {
            setImagenesAEliminar(imagenesAEliminar.filter(id => id !== multimediaId))
        } else {
            setImagenesAEliminar([...imagenesAEliminar, multimediaId])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        // Validaciones
        if (!formData.titulo) {
            setError('El título es obligatorio')
            return
        }
        if (!formData.descripcion) {
            setError('La descripción es obligatoria')
            return
        }
        if (formData.precio_mensual <= 0) {
            setError('El precio debe ser mayor a 0')
            return
        }

        try {
            // 1. Actualizar título y descripción de la publicación
            const result = await updatePublication(publicacion.id, {
                titulo: formData.titulo,
                descripcion: formData.descripcion,
            })

            if (!result.success) {
                setError(result.error || 'Error al actualizar la publicación')
                return
            }

            // 2. Eliminar imágenes marcadas
            if (imagenesAEliminar.length > 0) {
                for (const multimediaId of imagenesAEliminar) {
                    const mediaItem = publicacion.multimedia?.find(m => m.id === multimediaId)
                    if (mediaItem) {
                        // Extraer nombre del archivo de la URL
                        const fileName = mediaItem.url.split('/').pop()

                        // Eliminar de Storage
                        if (fileName) {
                            await supabase.storage.from('publicaciones').remove([fileName])
                        }

                        // Eliminar de la tabla multimedia_publicaciones
                        await supabase.from('multimedia_publicaciones').delete().eq('id', multimediaId)
                    }
                }
            }

            // 3. Subir nuevas imágenes
            if (nuevasImagenes.length > 0) {
                const imagenesRestantes = (publicacion.multimedia?.filter(m => !imagenesAEliminar.includes(m.id)) || [])
                const siguienteOrden = imagenesRestantes.length

                for (let i = 0; i < nuevasImagenes.length; i++) {
                    const file = nuevasImagenes[i]
                    const fileExt = file.name.split('.').pop()
                    const fileName = `${publicacion.inmueble_id}_${Date.now()}_${i}.${fileExt}`

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
                        publicacion_id: publicacion.id,
                        url: urlData.publicUrl,
                        tipo: 'imagen',
                        orden: siguienteOrden + i,
                        es_portada: imagenesRestantes.length === 0 && i === 0, // Primera imagen si no hay otras
                    })
                }
            }

            setSuccess(true)
            setTimeout(() => {
                onClose?.()
            }, 1500)
        } catch (err: any) {
            setError(err.message || 'Error al actualizar la publicación')
        }
    }

    const initialPosition = formData.latitud && formData.longitud
        ? { lat: formData.latitud, lng: formData.longitud }
        : undefined

    return (
        <div className="relative md:w-[650px] h-[700px] w-[350px] flex flex-col items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-y-auto custom-scrollbar-2">
            {/* Botón de cerrar */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="sticky top-0 right-0 ml-auto mb-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <form onSubmit={handleSubmit} className="w-full h-auto flex flex-col items-center gap-5 z-10 py-8">
                <h1 className="text-[#393939] font-bold text-3xl">Edita Tu Propiedad</h1>
                <span className="text-[#393939] font-semibold text-sm">Modifica los campos que desees</span>

                {/* Mensajes */}
                {error && (
                    <div className="w-full p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                        ⚠️ {error}
                    </div>
                )}
                {success && (
                    <div className="w-full p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm">
                        ✅ ¡Publicación actualizada exitosamente!
                    </div>
                )}

                {/* Tipo de inmueble (solo lectura para mostrar) */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Tipo de inmueble</label>
                    <div className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-gray-100 text-[#393939]">
                        {formData.tipo.charAt(0).toUpperCase() + formData.tipo.slice(1)}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">El tipo de inmueble no se puede cambiar</span>
                </div>

                {/* Título */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Título de la publicación *</label>
                    <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        placeholder="Ej: Hermoso apartamento en El Prado"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Mapa */}
                <div className="w-full">
                    <MapPicker
                        onLocationSelect={handleLocationSelect}
                        initialPosition={initialPosition}
                    />
                </div>

                {/* Habitaciones */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">¿Cuántas habitaciones tiene?</label>
                    <input
                        type="number"
                        value={formData.num_habitaciones || ''}
                        onChange={(e) => setFormData({ ...formData, num_habitaciones: +e.target.value })}
                        placeholder="Ej: 2"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Baños */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">¿Cuántos baños tiene?</label>
                    <input
                        type="number"
                        value={formData.num_banos || ''}
                        onChange={(e) => setFormData({ ...formData, num_banos: +e.target.value })}
                        placeholder="Ej: 2"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Amoblado */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">¿Está amoblado?</label>
                    <select
                        value={formData.amoblado ? 'si' : 'no'}
                        onChange={(e) => setFormData({ ...formData, amoblado: e.target.value === 'si' })}
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] focus:outline-none focus:border-[#EB8369]"
                    >
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                </div>

                {/* Capacidad */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Capacidad de personas</label>
                    <input
                        type="number"
                        value={formData.capacidad_personas || ''}
                        onChange={(e) => setFormData({ ...formData, capacidad_personas: +e.target.value })}
                        placeholder="Ej: 4"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Área total */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Área total (m²)</label>
                    <input
                        type="number"
                        value={formData.area_total || ''}
                        onChange={(e) => setFormData({ ...formData, area_total: +e.target.value })}
                        placeholder="Ej: 80"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Precio */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Precio mensual *</label>
                    <input
                        type="number"
                        value={formData.precio_mensual || ''}
                        onChange={(e) => setFormData({ ...formData, precio_mensual: +e.target.value })}
                        placeholder="Ej: 1500000"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Descripción */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Descripción *</label>
                    <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Describe las características principales de tu propiedad..."
                        className="w-full h-[90px] bg-[#FEFCEC] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Imágenes existentes */}
                {publicacion.multimedia && publicacion.multimedia.length > 0 && (
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Imágenes actuales</label>
                        <div className="grid grid-cols-3 gap-2">
                            {publicacion.multimedia.map((media, index) => (
                                <div key={media.id} className="relative">
                                    <img
                                        src={media.url}
                                        alt={`Imagen ${index + 1}`}
                                        className={`w-full h-20 object-cover rounded-lg transition ${imagenesAEliminar.includes(media.id) ? 'opacity-30 grayscale' : ''
                                            }`}
                                    />
                                    {media.es_portada && !imagenesAEliminar.includes(media.id) && (
                                        <span className="absolute top-1 right-1 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                                            Portada
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => toggleEliminarImagen(media.id)}
                                        className={`absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-xs transition ${imagenesAEliminar.includes(media.id)
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-red-500 text-white hover:bg-red-600'
                                            }`}
                                        title={imagenesAEliminar.includes(media.id) ? 'Restaurar' : 'Eliminar'}
                                    >
                                        {imagenesAEliminar.includes(media.id) ? '↺' : '×'}
                                    </button>
                                </div>
                            ))}
                        </div>
                        {imagenesAEliminar.length > 0 && (
                            <span className="text-xs text-red-600 mt-2">
                                ⚠️ {imagenesAEliminar.length} imagen(es) se eliminará(n) al guardar
                            </span>
                        )}
                    </div>
                )}

                {/* Agregar nuevas imágenes */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">
                        Agregar nuevas imágenes {nuevasImagenes.length > 0 && `(${nuevasImagenes.length})`}
                    </label>
                    <label
                        htmlFor="file-upload-edit"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#BCBBB0] rounded-lg cursor-pointer bg-[#FEFCEC] hover:bg-gray-50 transition"
                    >
                        <img src={imgUpload} alt="upload" className="w-10 h-10 mb-2" />
                        <p className="text-sm font-semibold text-[#393939]">Selecciona Imágenes</p>
                        <p className="text-xs text-gray-500">Máx. 10 imágenes en total</p>
                        <input
                            id="file-upload-edit"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>

                    {/* Preview de nuevas imágenes */}
                    {nuevasImagenesPreview.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            {nuevasImagenesPreview.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Nueva ${index + 1}`}
                                        className="w-full h-20 object-cover rounded-lg"
                                    />
                                    <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                        Nueva
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeNuevaImagen(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-[60%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="font-semibold text-sm text-white">
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </span>
                </button>
            </form>
        </div>
    )
}
