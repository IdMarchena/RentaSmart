import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useServicio } from "../hooks/useServicio"
import { useAuthContext } from "../context/AuthContext"
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import imgMeda from "../assets/medal.png"
import imgWhatsApp from "../assets/whatsapp.png"
import { CardReview } from "../components/CardReview"
import { ModalReview } from "../components/ModalReview"
import { CalificacionService } from "../services/CalificacionService"
import { BackendCalificacionRepository } from "@/repositories/Calificacion/CalificacionRepository"
import { BackendServicioRepository } from "@/repositories/Servicio/ServicioBackendRepository"
import { BackendPublicacionRepository } from "@/repositories/publicaciones/PublicacionRepository.backend"

const mapContainerStyle = {
    width: '100%',
    height: '520px',
    borderRadius: '10px'
}

export const Servicio = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuthContext()
    const { getById, createCalificacion, loading } = useServicio()
    const [servicio, setServicio] = useState<any>(null)
    const [calificaciones, setCalificaciones] = useState<any[]>([])
    const [promedio, setPromedio] = useState(0)
    const [totalCalificaciones, setTotalCalificaciones] = useState(0)
    const [showModalReview, setShowModalReview] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // Crear instancia de CalificacionService para hidratar las calificaciones
    const calificacionRepository = new BackendCalificacionRepository()
    const servicioRepository = new BackendServicioRepository()
    const publicacionRepository = new BackendPublicacionRepository()
    const calificacionService = new CalificacionService(
        calificacionRepository,
        servicioRepository,
        publicacionRepository
    )

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    })

    useEffect(() => {
        const loadServicio = async () => {
            if (id) {
                try {
                    const result = await getById(parseInt(id))
                    if (result) {
                        setServicio(result)

                        // Cargar y hidratar calificaciones del servicio
                        if (result.calificaciones && result.calificaciones.length > 0) {
                            console.log("🔄 Hidratando calificaciones del servicio:", result.calificaciones);
                            
                            const calificacionesHidratadas = await Promise.all(
                                result.calificaciones.map((cal: any) => 
                                    calificacionService.getFullCalificacion(cal.id)
                                )
                            );
                            
                            console.log("✅ Calificaciones hidratadas:", calificacionesHidratadas);
                            setCalificaciones(calificacionesHidratadas)
                            
                            // Calcular promedio con el campo correcto 'puntaje'
                            const suma = calificacionesHidratadas.reduce((acc: number, cal: any) => acc + (cal.puntaje || 0), 0)
                            setPromedio(suma / calificacionesHidratadas.length)
                            setTotalCalificaciones(calificacionesHidratadas.length)
                        } else {
                            console.log("ℹ️ El servicio no tiene calificaciones");
                            setCalificaciones([])
                            setPromedio(0)
                            setTotalCalificaciones(0)
                        }
                    }
                } catch (error) {
                    console.error('Error al cargar servicio:', error)
                }
            }
        }
        loadServicio()
    }, [id])

    const handleSubmitReview = async (puntuacion: number, comentario: string) => {
        if (!user) {
            setErrorMessage('Debes iniciar sesión para calificar')
            return
        }

        if (!id) return

        try {
            const result = await createCalificacion(parseInt(id), parseInt(user.id), puntuacion, comentario)

            if (result) {
                // Recargar servicio para obtener calificaciones actualizadas
                const updatedServicio = await getById(parseInt(id))
                if (updatedServicio) {
                    setServicio(updatedServicio)
                    
                    // Hidratar las calificaciones actualizadas
                    if (updatedServicio.calificaciones && updatedServicio.calificaciones.length > 0) {
                        console.log("🔄 Recargando y hidratando calificaciones después de crear nueva:");
                        
                        const calificacionesHidratadas = await Promise.all(
                            updatedServicio.calificaciones.map((cal: any) => 
                                calificacionService.getFullCalificacion(cal.id)
                            )
                        );
                        
                        console.log("✅ Calificaciones recargadas e hidratadas:", calificacionesHidratadas);
                        setCalificaciones(calificacionesHidratadas)
                        
                        const suma = calificacionesHidratadas.reduce((acc: number, cal: any) => acc + (cal.puntaje || 0), 0)
                        setPromedio(suma / calificacionesHidratadas.length)
                        setTotalCalificaciones(calificacionesHidratadas.length)
                    } else {
                        setCalificaciones([])
                        setPromedio(0)
                        setTotalCalificaciones(0)
                    }
                }

                setShowModalReview(false)
                setErrorMessage('')
            }
        } catch (error: any) {
            setErrorMessage(error.message || 'Error al crear calificación')
        }
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#EB8369]"></div>
                </div>
                <Footer />
            </>
        )
    }

    if (!servicio) {
        return (
            <>
                <Header />
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-600">Servicio no encontrado</h1>
                    <p className="text-gray-500 mt-2">El servicio que buscas no existe o ha sido eliminado</p>
                </div>
                <Footer />
            </>
        )
    }

    const precioFormateado = servicio.precio?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }) || 'N/A'

    const telefono = servicio.usuario?.telefono || '3001234567'
    const whatsappLink = `https://wa.me/57${telefono}?text=Hola, estoy interesado en tu servicio de ${servicio.nombre}`

    const mapCenter = servicio.ubicacion?.latitud && servicio.ubicacion?.longitud
    ? { 
        lat: Number(servicio.ubicacion.latitud), 
        lng: Number(servicio.ubicacion.longitud) 
      }
    : null

    return (
        <>
            <Header />
            <div className="w-full h-auto p-5 mt-15 flex flex-col lg:flex-row items-start gap-10">
                {/* Panel Izquierdo - Información del Servicio */}
                <div className="w-full lg:w-[60%] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] rounded-[10px]">
                    <div className="w-full h-auto bg-[#FEFCEC] rounded-[10px] p-6">
                        {/* Título y Precio */}
                        <div className="w-full flex flex-col items-start justify-between mb-4">
                            <h1 className="text-3xl font-bold text-[#393939] mb-2">{servicio.nombre}</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-[#EB8369]">{precioFormateado}</span>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                    servicio.estadoServicio === 'ACTIVO' ? 'bg-green-500' :
                                    servicio.estadoServicio === 'PENDIENTE' ? 'bg-yellow-500' : 'bg-gray-500'
                                }`}>
                                    {servicio.estadoServicio}
                                </span>
                            </div>
                        </div>

                        {/* Descripción */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-[#393939] mb-2">Descripción del Servicio</h2>
                            <p className="text-gray-700 leading-relaxed">{servicio.descripcion}</p>
                        </div>

                        {/* Tipo de Servicio */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-[#393939] mb-2">Categoría</h2>
                            <span className="inline-block px-4 py-2 bg-[#EB8369] text-white rounded-full text-sm font-bold">
                                {servicio.tipo?.replace(/_/g, ' ')}
                            </span>
                        </div>

                        {/* Información del Proveedor */}
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-[#393939] mb-2">Información del Proveedor</h2>
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                <div className="w-12 h-12 bg-[#EB8369] rounded-full flex items-center justify-center text-white font-bold">
                                    {servicio.usuario?.nombre?.charAt(0) || 'P'}
                                </div>
                                <div>
                                    <p className="font-semibold text-[#393939]">{servicio.usuario?.nombre || 'Proveedor'}</p>
                                    <p className="text-sm text-gray-600">{servicio.usuario?.correo || 'Sin correo'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ubicación */}
                        {mapCenter && isLoaded && (
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-[#393939] mb-2">Ubicación del Servicio</h2>
                                <GoogleMap
                                    mapContainerStyle={mapContainerStyle}
                                    center={mapCenter}
                                    zoom={15}
                                    options={{
                                        styles: [
                                            {
                                                featureType: "all",
                                                elementType: "geometry",
                                                stylers: [{ color: "#f5f5f5" }]
                                            }
                                        ]
                                    }}
                                >
                                    <Marker position={mapCenter} />
                                </GoogleMap>
                            </div>
                        )}

                        {/* Botón de Contacto */}
                        <div className="w-full flex justify-center mt-6">
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <img src={imgWhatsApp} alt="WhatsApp" className="w-5 h-5" />
                                Contactar por WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Panel Derecho - Reseñas */}
                <div className="w-full lg:w-[40%]">
                    <div className="w-full bg-[#FEFCEC] rounded-[10px] p-6 shadow-[10px_10px_10px_rgba(0,0,0,0.2)]">
                        {/* Header de Reseñas */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-[#393939]">Reseñas del Servicio</h2>
                            <button
                                onClick={() => setShowModalReview(true)}
                                className="px-4 py-2 bg-[#EB8369] text-white rounded-lg hover:bg-[#d67359] transition-colors text-sm font-bold"
                            >
                                Escribir Reseña
                            </button>
                        </div>

                        {/* Estadísticas */}
                        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <img src={imgMeda} alt="Estrella" className="w-6 h-6" />
                                <span className="text-2xl font-bold text-[#393939]">{promedio.toFixed(1)}</span>
                            </div>
                            <div className="text-gray-600">
                                <p className="text-sm">{totalCalificaciones} reseña{totalCalificaciones !== 1 ? 's' : ''}</p>
                            </div>
                        </div>

                        {/* Lista de Reseñas */}
                        <div className="space-y-4 max-h-[400px] overflow-y-auto">
                            {calificaciones.length > 0 ? (
                                calificaciones.map((calificacion) => (
                                    <CardReview key={calificacion.id} calificacion={calificacion} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p className="text-sm">Este servicio aún no tiene reseñas</p>
                                    <p className="text-xs mt-2">¡Sé el primero en compartir tu experiencia!</p>
                                </div>
                            )}
                        </div>

                        {/* Mensaje de Error */}
                        {errorMessage && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                                ⚠️ {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Reseña */}
            {/* Dentro de Servicio.tsx, al final antes del Footer */}
            {showModalReview && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
                <ModalReview
                    onClose={() => {
                        setShowModalReview(false)
                        setErrorMessage('')
                    }}
                    onSubmit={handleSubmitReview}
                    publicacionTitulo={servicio.nombre}
                />
            </div>
        )}

            <Footer />
        </>
    )
}
