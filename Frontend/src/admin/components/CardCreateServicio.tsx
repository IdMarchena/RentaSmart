import { useState } from 'react'
import { useServicio } from '@/hooks/useServicio'
import { useAuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import imgUpload from '@/assets/upload.png' // Reutilizando tu recurso

interface CardCreateServicioProps {
    onClose?: () => void
}

export const CardCreateServicio = ({ onClose }: CardCreateServicioProps) => {
    const { create, loading } = useServicio()
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        tipoServicio: 'PLOMERIA' as const,
        precio: '' as unknown as number, // Para que empiece vacío y no en 0
        idUbicacion: 1, // Hardcoded como pediste
    })

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const tiposServicio = [
        'PLOMERIA', 'ELECTRICIDAD', 'CARPINTERIA', 'PINTURA', 
        'REPARACION_ELECTRODOMESTICOS', 'ALBAÑILERIA', 'LIMPIEZA_GENERAL', 
        'INSTALACION_SISTEMAS_ALARMAS', 'INSTALACION_SISTEMA_CAMARAS', 
        'INSTALACION_CERRADURAS', 'RENOVACION_ACABADOS', 'JARDINERIA', 
        'MUDANZAS', 'INSTALACION_INTERNET', 'TRANSPORTE_MERCANCIA'
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        // Validaciones básicas
        if (!user?.id) {
            setError('Debes estar autenticado para crear un servicio')
            return
        }
        if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.tipoServicio) {
            setError('Todos los campos son obligatorios')
            return
        }
        if (formData.precio < 0 || formData.precio > 2147483647) {
            setError('El precio no puede ser negativo o mayor a 2147483647')
            return
        }

        try {
        await create({
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            tipo: formData.tipoServicio, 
            precio: Number(formData.precio),
            estado: 'PENDIENTE', 
            idUsuario: user.id,
            idUbicacion: formData.idUbicacion,
            calificacionesIds: []
        } as any);

        setSuccess(true);
        setTimeout(() => {
            navigate('/admin/services');
            onClose?.();
        }, 2000);
    } catch (err: any) {
        setError(err.message || 'Error al crear el servicio');
    }
}

    return (
        <div className="relative md:w-[600px] h-[650px] w-[350px] flex flex-col items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-y-auto custom-scrollbar-2">
            
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-5 py-8">
                <div className="text-center mb-2">
                    <h1 className="text-[#393939] font-bold text-3xl">Ofrece tu Servicio</h1>
                    <p className="text-[#393939] font-semibold text-sm opacity-70">Llega a más clientes publicando tu especialidad</p>
                </div>

                {/* Mensajes de Estado */}
                {error && (
                    <div className="w-full p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm animate-pulse">
                        ⚠️ {error}
                    </div>
                )}
                {success && (
                    <div className="w-full p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm">
                        ✅ ¡Servicio publicado con éxito!
                    </div>
                )}

                {/* Nombre del Servicio */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Nombre del Servicio *</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Plomería Profesional 24/7"
                        className="w-full h-[45px] bg-transparent text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-3 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Tipo de Servicio */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Categoría *</label>
                    <select
                        value={formData.tipoServicio}
                        onChange={(e) => setFormData({ ...formData, tipoServicio: e.target.value as any })}
                        className="w-full h-[45px] px-3 rounded-[10px] border border-[#BCBBB0] bg-transparent text-[#393939] focus:outline-none focus:border-[#EB8369]"
                    >
                        {tiposServicio.map(tipo => (
                            <option key={tipo} value={tipo}>
                                {tipo.replace(/_/g, ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Precio */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Precio sugerido (COP) *</label>
                    <input
                        type="number"
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: e.target.value as any })}
                        placeholder="Ingresa el valor del servicio"
                        className="w-full h-[45px] bg-transparent text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-3 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                {/* Descripción */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Descripción detallada *</label>
                    <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        placeholder="Explica qué incluye tu servicio, experiencia, etc..."
                        className="w-full h-[120px] bg-transparent text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-3 focus:outline-none focus:border-[#EB8369] resize-none"
                    />
                </div>

                {/* Botón Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-4 h-[50px] rounded-[12px] bg-[#EB8369] shadow-[0px_5px_15px_rgba(235,131,105,0.4)] cursor-pointer hover:bg-[#d67359] transition-all duration-300 disabled:opacity-50"
                >
                    <span className="font-bold text-white uppercase tracking-wider">
                        {loading ? 'Procesando...' : 'Crear Servicio'}
                    </span>
                </button>
            </form>
        </div>
    )
}