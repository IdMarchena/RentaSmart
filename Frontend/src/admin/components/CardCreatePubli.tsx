import { useState } from 'react'
import { MapPicker } from '@/components/MapPicker'
import { usePublicaciones } from '@/hooks/usePublicaciones'
import imgUpload from '@/assets/upload.png'
import { useNavigate } from 'react-router-dom'
interface CardCreatePubliProps {
    onClose?: () => void
}

export const CardCreatePubli = ({ onClose }: CardCreatePubliProps) => {
    const { create, loading } = usePublicaciones()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        // Datos del inmueble
        tipo: 'apartamento' as 'apartamento' | 'casa' | 'habitacion',
        titulo: '',
        descripcion: '',
        ciudad: '',
        departamento: '',
        direccion: '',
        latitud: 0,
        longitud: 0,
        area_total: 0,
        num_habitaciones: 0,
        num_banos: 0,
        num_pisos: 0,
        capacidad_personas: 0,
        amoblado: true,
        precio_mensual: 0,
        // Campos adicionales
        estrato: 1,
        telefono_contacto: '',
    })

    const [imagenes, setImagenes] = useState<File[]>([])
    const [imagenesPreview, setImagenesPreview] = useState<string[]>([])
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length + imagenes.length > 10) {
            setError('Máximo 10 imágenes permitidas')
            return
        }

        setImagenes([...imagenes, ...files])

        // Crear previews
        const newPreviews = files.map((file) => URL.createObjectURL(file))
        setImagenesPreview([...imagenesPreview, ...newPreviews])
    }

    const removeImage = (index: number) => {
        setImagenes(imagenes.filter((_, i) => i !== index))
        URL.revokeObjectURL(imagenesPreview[index])
        setImagenesPreview(imagenesPreview.filter((_, i) => i !== index))
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
        if (!formData.ciudad || !formData.direccion) {
            setError('Debes seleccionar una ubicación en el mapa')
            return
        }
        if (formData.precio_mensual <= 0) {
            setError('El precio debe ser mayor a 0')
            return
        }
        if (imagenes.length === 0) {
            setError('Debes agregar al menos una imagen')
            return
        }

        const result = await create({
            inmueble: {
                tipo: formData.tipo,
                descripcion: formData.descripcion,
                ubicacion: { 
                    id: 1,
                    padre: null as any,
                    nombre: formData.ciudad,
                    latitud: formData.latitud,
                    longitud: formData.longitud,
                    estado: 'ACTIVA' as any,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                areaTotal: formData.area_total,
                numeroBanos: formData.num_banos,
                numeroPisos: formData.num_pisos,
                capacidadPersonas: formData.capacidad_personas,
                estrato: formData.estrato,
                numeroHabitaciones: formData.num_habitaciones
            },
            publicacion: {
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                precio: formData.precio_mensual
            },
            imagenes: imagenesPreview // Enviamos las URLs de las imágenes
        })

        if (result) {
            setSuccess(true)
            navigate('/admin/publications')
            setTimeout(() => {
                onClose?.()
            }, 2000)
        } else {
            setError('Error al crear la publicación')
        }
    }

    return (
        <div className="relative md:w-[650px] h-[700px] w-[350px] flex flex-col items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-y-auto custom-scrollbar-2">
            {/* Botón de cerrar */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-12 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <form onSubmit={handleSubmit} className="w-full h-auto flex flex-col items-center gap-5 z-10 py-12">
                <h1 className="text-[#393939] font-bold text-3xl">Publica Tu Propiedad</h1>
                <span className="text-[#393939] font-semibold text-sm">Completa todos los campos requeridos</span>

                {/* Mensajes */}
                {error && (
                    <div className="w-full p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                        ⚠️ {error}
                    </div>
                )}
                {success && (
                    <div className="w-full p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm">
                        ✅ ¡Publicación creada exitosamente!
                    </div>
                )}

                {/* Tipo de inmueble */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">¿Qué quieres arrendar? *</label>
                    <select
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] focus:outline-none focus:border-[#EB8369]"
                    >
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                        <option value="habitacion">Habitación</option>
                    </select>
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
                    <MapPicker onLocationSelect={handleLocationSelect} />
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

                {/* Imágenes */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Imágenes (máx. 10) *</label>
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#BCBBB0] rounded-lg cursor-pointer bg-[#FEFCEC] hover:bg-gray-50 transition"
                    >
                        <img src={imgUpload} alt="upload" className="w-10 h-10 mb-2" />
                        <p className="text-sm font-semibold text-[#393939]">Carga Imágenes</p>
                        <input id="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>

                    {/* Preview de imágenes */}
                    {imagenesPreview.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-3">
                            {imagenesPreview.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img src={preview} alt={`Preview ${index}`} className="w-full h-20 object-cover rounded-lg" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
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
                    <span className="font-semibold text-sm text-white">{loading ? 'Publicando...' : 'Publicar'}</span>
                </button>
            </form>
        </div>
    )
}
