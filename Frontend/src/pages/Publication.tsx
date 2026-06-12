import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { usePublicaciones } from '@/hooks/usePublicaciones'
import { useFavorito } from '../hooks/useFavorito'
import { useChat } from '../hooks/useChat'
import { useAuthContext } from '../context/AuthContext'
import { useUsuarioRegistrado } from '@/hooks/useUsuarioRegistrado'
import { usuariosRepository } from '@/repositories/usuarios'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import imgBed from "../assets/bed.png"
import imgBath from "../assets/bath.png"
import imgMeda from "../assets/medal.png"
import imgMap from "../assets/maps1.png"
import imgRuler from "../assets/ruler.png"
import imgUsers from "../assets/users.png"
import imgDeliver from "../assets/delivery.png"
import imgRound from "../assets/round.png"
import imgUserss from "../assets/userss.png"
import imgWhatsApp from "../assets/whatsapp.png"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CardReview } from "../components/CardReview"
import { ModalReview } from "../components/ModalReview"
import { useAuth } from '@/hooks/useAuth'

const mapContainerStyle = {
    width: '100%',
    height: '520px',
    borderRadius: '10px'
}

export const Publication = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAuthContext()
    const { getById, getCalificaciones, createCalificacion, getPromedioCalificacion, loading } = usePublicaciones()
    const { create, verificarSiExisteChatEntreUsuarios, getAllByUserId } = useChat()
    const { getById: getUsuarioRegistradoById } = useUsuarioRegistrado()
    const { create: createFavorito, remove, getByUsuarioId } = useFavorito()
    const [publication, setPublication] = useState<any>(null)
    const [calificaciones, setCalificaciones] = useState<any[]>([])
    const [promedio, setPromedio] = useState<number>(0)
    const [totalCalificaciones, setTotalCalificaciones] = useState<number>(0)
    const [loadingChat, setLoadingChat] = useState(false)
    const [usuarioCompleto, setUsuarioCompleto] = useState<any>(null)
    const [usuarioRegistrado, setUsuarioRegistrado] = useState<any>(null)
    const [showModalReview, setShowModalReview] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [isFavorito, setIsFavorito] = useState(false)
    const [loadingFav, setLoadingFav] = useState(false)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    })

    useEffect(() => {
        const checkFavorito = async () => {
            if (user?.id && publication?.id) {
                try {
                    const favoritos = await getByUsuarioId(parseInt(user.id))
                    const esFavorito = favoritos.some(fav => fav.publicacion.id === publication.id)
                    setIsFavorito(esFavorito)
                } catch (error) {
                    console.error('Error checking favorito:', error)
                }
            }
        }
        checkFavorito()
    }, [user?.id, publication?.id, getByUsuarioId])

    const handleFavorito = async () => {
        if (!user?.id) {
            alert('Debes iniciar sesión para agregar a favoritos')
            return
        }

        if (!publication?.id) return

        setLoadingFav(true)
        try {
            if (isFavorito) {
                // Buscar y eliminar el favorito
                const favoritos = await getByUsuarioId(parseInt(user.id))
                const favoritoExistente = favoritos.find(fav => fav.publicacion.id === publication.id)
                if (favoritoExistente) {
                    await remove(favoritoExistente.id)
                    setIsFavorito(false)
                }
            } else {
                // Crear nuevo favorito
                await create({
                    usuario: { 
                        id: parseInt(user.id),
                        nombre: user.nombre || '',
                        correo: user.correo || '',
                        rol: user.rol || 'CLIENTE'
                    },
                    publicacion: { 
                        id: publication.id,
                        titulo: publication.titulo,
                        descripcion: publication.descripcion,
                        inmueble: publication.inmueble || {} as any,
                        fechaPublicacion: publication.fechaPublicacion || new Date().toISOString(),
                        estadoPublicacion: (publication.estadoPublicacion as any) || 'PUBLICADA',
                        precio: publication.precio || 0,
                        usuario: publication.usuario || { id: 0 } as any,
                        multimedia: (publication.multimedia || []) as any,
                        calificaciones: publication.calificaciones || []
                    },
                    fecha: new Date().toISOString()
                })
                setIsFavorito(true)
            }
        } catch (error) {
            console.error('Error handling favorito:', error)
            alert('Error al gestionar favorito')
        } finally {
            setLoadingFav(false)
        }
    }

    useEffect(() => {
        const loadPublication = async () => {
            if (!id) return;
            
            try {
                const result = await getById(parseInt(id));
                
                if (result) {
                    setPublication(result);
                    
                    // Obtener el usuario completo para tener acceso al teléfono
                    if (result?.usuario?.id) {
                        console.log('🔍 Obteniendo perfil completo del usuario para ID:', result.usuario.id)
                        const usuarioFull = await usuariosRepository.getProfileById(result.usuario.id)
                        console.log('✅ Perfil completo obtenido:', usuarioFull)
                        setUsuarioCompleto(usuarioFull)
                        
                        // Obtener el UsuarioRegistrado que tiene el teléfono
                        console.log('📞 Obteniendo UsuarioRegistrado para ID:', result.usuario.id)
                        const usuarioReg = await getUsuarioRegistradoById(result.usuario.id)
                        console.log('✅ UsuarioRegistrado obtenido:', usuarioReg)
                        setUsuarioRegistrado(usuarioReg)
                    }
                    
                    // Cargar calificaciones explícitamente para asegurar que siempre se carguen
                    console.log('⭐ Cargando calificaciones para publicación ID:', result.id)
                    try {
                        const calResult = await getCalificaciones(result.id)
                        if (calResult.success && calResult.data) {
                            console.log('✅ Calificaciones obtenidas:', calResult.data)
                            setCalificaciones(calResult.data)
                            
                            const total = calResult.data.length
                            const suma = calResult.data.reduce((acc: number, curr: any) => acc + curr.puntuacion, 0)
                            
                            setTotalCalificaciones(total)
                            setPromedio(total > 0 ? suma / total : 0)
                            
                            console.log(`📊 Total calificaciones: ${total}, Promedio: ${total > 0 ? (suma / total).toFixed(1) : 0}`)
                        } else {
                            console.log('⚠️ No se encontraron calificaciones o error en la respuesta')
                            setCalificaciones([])
                            setTotalCalificaciones(0)
                            setPromedio(0)
                        }
                    } catch (error) {
                        console.error('❌ Error cargando calificaciones:', error)
                        setCalificaciones([])
                        setTotalCalificaciones(0)
                        setPromedio(0)
                    }
                }
            } catch (error) {
                console.error('Error al cargar publicación:', error);
            }
        };
        loadPublication();
    }, [id, getById]);

    const handleSubmitReview = async (puntuacion: number, comentario: string) => {
        if (!user) {
            setErrorMessage('Debes iniciar sesión para calificar')
            return
        }

        if (!id) return

        const result = await createCalificacion(parseInt(id), parseInt(user.id), puntuacion, comentario)

        if (result.success) {
            const calResult = await getCalificaciones(parseInt(id))
            if (calResult.success && calResult.data) {
                setCalificaciones(calResult.data)
                console.log("RESEÑAS RECIBIDAS:", calResult.data);
            }

            const promResult = await getPromedioCalificacion(parseInt(id))
            if (promResult) {
                setPromedio(promResult.promedio || 0)
                setTotalCalificaciones(promResult.total || 0)
            }

            setShowModalReview(false)
        } else {
            throw new Error(result.error || 'Error al crear calificación')
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

    if (!publication) {
        return (
            <>
                <Header />
                <div className="w-full h-screen flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-600">Publicación no encontrada</h1>
                    <p className="text-gray-500 mt-2">La publicación que buscas no existe o ha sido eliminada</p>
                </div>
                <Footer />
            </>
        )
    }

    const imagenes = publication.multimedia?.sort((a: any, b: any) => a.orden - b.orden) || []
    const precioFormateado = publication.precio?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }) || 'N/A'
    
    const telefono = usuarioRegistrado?.telefono?.toString() || 
                     usuarioRegistrado?.celular?.toString() || 
                     usuarioRegistrado?.cel?.toString() ||
                     usuarioCompleto?.telefono?.toString() || 
                     usuarioCompleto?.celular?.toString() || 
                     usuarioCompleto?.telefonoContacto?.toString() || 
                     publication?.usuario?.telefono?.toString() || 
                     publication?.usuario?.celular?.toString() || 
                     '3001234567'
    const whatsappLink = `https://wa.me/57${telefono}?text=Hola, estoy interesado en ${publication?.titulo || 'esta propiedad'}`
    
    // Depuración completa para encontrar el teléfono
    console.log('📞 DEPURACIÓN COMPLETA DEL TELÉFONO:')
    console.log('👤 Usuario básico:', publication?.usuario)
    console.log('👤 Usuario completo:', usuarioCompleto)
    console.log('👤 Usuario Registrado:', usuarioRegistrado)
    console.log('📱 teléfono (usuarioRegistrado):', usuarioRegistrado?.telefono)
    console.log('📱 celular (usuarioRegistrado):', usuarioRegistrado?.celular)
    console.log('📱 cel (usuarioRegistrado):', usuarioRegistrado?.cel)
    console.log('📱 teléfono (usuarioCompleto):', usuarioCompleto?.telefono)
    console.log('📱 celular (usuarioCompleto):', usuarioCompleto?.celular)
    console.log('📱 telefonoContacto (usuarioCompleto):', usuarioCompleto?.telefonoContacto)
    console.log('📱 teléfono (publication.usuario):', publication?.usuario?.telefono)
    console.log('📱 celular (publication.usuario):', publication?.usuario?.celular)
    console.log('📱 Teléfono final usado:', telefono)
    console.log('🔗 WhatsApp link:', whatsappLink)

    const mapCenter = publication.inmueble?.ubicacion?.latitud && publication.inmueble?.ubicacion?.longitud
    ? { 
        lat: publication.inmueble.ubicacion.latitud, 
        lng: publication.inmueble.ubicacion.longitud 
    } : null

    // Función para manejar el clic en "Abrir Chat"
    const handleOpenChat = async () => {
        console.log('🚀 handleOpenChat - Iniciando proceso...')
        console.log('👤 Usuario actual:', user)
        console.log('📄 Publicación:', publication)
        
        if (!user?.id) {
            console.log('❌ Usuario no autenticado')
            alert('Debes iniciar sesión para abrir un chat')
            return
        }

        if (!publication?.usuario?.id) {
            console.log('❌ No se puede identificar al propietario')
            alert('No se puede identificar al propietario de la publicación')
            return
        }

        // No permitir crear chat consigo mismo
        if (user.id === publication.usuario.id) {
            console.log('❌ Usuario intenta chatear consigo mismo')
            alert('No puedes crear un chat contigo mismo')
            return
        }

        console.log('✅ Validaciones pasadas, iniciando proceso de chat...')
        setLoadingChat(true)

        try {
            console.log('🔍 Verificando si existe chat entre usuarios...')
            console.log('👤 Propietario ID:', publication.usuario.id)
            console.log('👤 Arrendatario ID:', parseInt(user.id))
            
            // Verificar si ya existe un chat entre los usuarios
            const yaExisteChat = await verificarSiExisteChatEntreUsuarios(
                publication.usuario.id,
                parseInt(user.id)
            )

            console.log('📊 Resultado verificación:', yaExisteChat)

            if (yaExisteChat) {
                console.log('✅ Chat ya existe, redirigiendo...')
                alert('Ya existe un chat activo con este propietario. Serás redirigido a la sección de mensajes.')
                // Recargar chats para asegurar hidratación y redirigir
                await getAllByUserId()
                window.location.href = '/admin/messages'
                return
            }

            console.log('🆕 Creando nuevo chat...')
            // Crear nuevo chat
            const nuevoChat = await create({
                nombre: `Chat - ${publication.titulo}`,
                usuarioA: { 
                    id: publication.usuario.id,
                    nombre: publication.usuario.nombre || 'Propietario',
                    correo: publication.usuario.correo || '',
                    rol: publication.usuario.rol || 'CLIENTE'
                },
                usuarioB: { 
                    id: parseInt(user.id),
                    nombre: user.nombre || 'Usuario',
                    correo: user.correo || '',
                    rol: user.rol || 'CLIENTE'
                },
                estado_chat: 'ACTIVO',
                fechaCreacion: new Date().toISOString(),
                mensajes: []
            })

            console.log('✅ Chat creado exitosamente:', nuevoChat)
            
            // Recargar chats para asegurar que se hidrate correctamente
            await getAllByUserId()
            
            alert('Chat creado exitosamente. Serás redirigido a la sección de mensajes.')
            // Redirigir a la sección correcta de mensajes
            window.location.href = '/admin/messages'

        } catch (error: any) {
            console.error('❌ Error al manejar el chat:', error)
            console.error('❌ Detalles del error:', {
                message: error.message,
                stack: error.stack,
                response: error.response
            })
            alert(`Error al crear el chat: ${error.message || 'Error desconocido'}`)
        } finally {
            setLoadingChat(false)
        }
    }

    return (
        <>
            <Header />
            <div className="w-full h-auto p-5 mt-15 flex flex-col lg:flex-row items-start gap-10">
                <div className="w-full lg:w-[60%] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] rounded-[10px]">
                    {imagenes.length > 0 ? (
                        <Carousel className="w-full">
                            <CarouselContent>
                                {imagenes.map((img: any) => (
                                    <CarouselItem key={img.id}>
                                        <img
                                            src={img.url}
                                            alt={publication.titulo}
                                            className="w-full h-[400px] object-cover rounded-[10px]"
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                        </Carousel>
                    ) : (
                        <div className="w-full h-[400px] bg-gray-200 rounded-[10px] flex items-center justify-center">
                            <span className="text-gray-500">Sin imágenes disponibles</span>
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-[40%] flex flex-col items-start">
                    <h2 className="text-[#393939] text-[20px] md:text-[40px] font-bold">{publication.titulo}</h2>
                    <br />
                    <p className="text-[#A6A6A6] text-sm md:text-sm font-normal">
                        {publication.descripcion}
                    </p>
                    <div className="w-[90%] flex flex-row flex-wrap justify-between mt-10 mb-10 gap-4">
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgBed} alt="bed" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    {publication.inmueble?.numeroHabitaciones || 0} Hab
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgBath} alt="bath" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    {publication.inmueble?.numeroBanos || 0} Baños
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgMeda} alt="rating" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    Calificaciones   {totalCalificaciones > 0 ? `${promedio.toFixed(1)} (${totalCalificaciones})` : 'Sin calificaciones'}
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgUsers} alt="estrato" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    Estrato {publication.inmueble?.estrato || 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgMap} alt="map" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    {publication.inmueble?.ubicacion?.nombre || 'Ubicación no disponible'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgRuler} alt="ruler" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    {publication.inmueble?.areaTotal || 0} m²
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgRound} alt="type" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    {publication.inmueble?.tipo ?
                                        (publication.inmueble.tipo.charAt(0).toUpperCase() + publication.inmueble.tipo.slice(1))
                                        : 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgDeliver} alt="furnished" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    {publication.inmueble?.estadoInmueble === 'LIBRE_AMOBLADO' ? 'Amoblado' : 
                                     publication.inmueble?.estadoInmueble === 'LIBRE_NO_AMOBLADO' ? 'Sin amoblar' :
                                     publication.inmueble?.estadoInmueble || 'N/A'}
                                </span>
                            </div>
                            <div className="flex flex-row items-center gap-1">
                                <img src={imgUsers} alt="capacity" className="w-4 h-4" />
                                <span className="text-[#393939] text-sm md:text-sm font-bold">
                                    C.{publication.inmueble?.capacidadPersonas || 0} personas
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[#EB8369] text-sm md:text-xl font-bold">{precioFormateado}</span>
                        
                        {/* Corazón de favoritos */}
                        <button
                            onClick={handleFavorito}
                            disabled={loadingFav}
                            className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill={isFavorito ? "#EB8369" : "none"}
                                stroke={isFavorito ? "#EB8369" : "#393939"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-200"
                            >
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start p-5 mt-10">
                <h1 className="text-[#393939] text-[20px] md:text-[20px] font-bold">Medios de Contacto</h1>
                <div className="w-full flex flex-col lg:flex-row items-start justify-between mt-10 gap-5">
                    <div className="w-full lg:w-[40%] flex flex-col items-start gap-3">
                        <div className="w-full h-[250px] rounded-[10px] border-[1px] border-[#C7C7C7] p-10 flex flex-col items-start gap-2 bg-[#FEFEFE]">
                            <div className="flex flex-row items-start gap-2">
                                <img src={imgWhatsApp} alt="whatsapp" className="w-15 h-15 bg-[#DCFCE7] rounded-full p-2" />
                                <div className="flex flex-col items-start">
                                    <h2 className="text-[#393939] text-sm md:text-lg font-bold">WhatsApp</h2>
                                    <span className="text-[#16A34A] text-[12px] md:text-[12px] font-bold">Respuesta inmediata</span>
                                </div>
                            </div>
                            <span className="text-[#393939] text-[12px] md:text-[13px] font-normal">
                                Chatea directamente con el arrendador a través de WhatsApp. Obtén respuestas rápidas sobre disponibilidad, precios y visitas.
                            </span>
                            <a
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full h-[40px] bg-[#5CA978] rounded-[10px] text-white text-[12px] md:text-[12px] font-bold mt-5 flex items-center justify-center hover:bg-[#4a8a60] transition"
                            >
                                Contactar por WhatsApp
                            </a>
                        </div>
                        <div className="w-full h-[250px] rounded-[10px] border-[1px] border-[#C7C7C7] p-10 flex flex-col items-start gap-2 bg-[#FEFEFE]">
                            <div className="flex flex-row items-start gap-2">
                                <img src={imgUserss} alt="chat" className="w-15 h-15 bg-[#DBEAFE] rounded-full p-2" />
                                <div className="flex flex-col items-start">
                                    <h2 className="text-[#393939] text-sm md:text-lg font-bold">Chat en Vivo</h2>
                                    <span className="text-[#2684FC] text-[12px] md:text-[12px] font-bold">Uso del canal de la plataforma</span>
                                </div>
                            </div>
                            <span className="text-[#393939] text-[12px] md:text-[13px] font-normal">
                                Chatea directamente con el arrendador a través de la plataforma en tiempo real. Obtén respuestas rápidas sobre disponibilidad, precios y visitas.
                            </span>
                            <button 
                                onClick={handleOpenChat}
                                disabled={loadingChat}
                                className="w-full h-[40px] bg-[#68A9FD] rounded-[10px] text-white text-[12px] md:text-[12px] font-bold mt-5 hover:bg-[#5090e0] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loadingChat ? 'Procesando...' : 'Abrir Chat'}
                            </button>
                        </div>
                    </div>
                    <div className="w-full lg:w-[55%]">
                        {isLoaded && mapCenter ? (
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={mapCenter}
                                zoom={15}
                            >
                                <Marker position={mapCenter} />
                            </GoogleMap>
                        ) : (
                            <div className="w-full h-[520px] bg-gray-200 rounded-[10px] flex items-center justify-center">
                                <span className="text-gray-500">
                                    {!mapCenter ? 'Ubicación no disponible' : 'Cargando mapa...'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start p-5 mt-10">
                <div className="w-full flex flex-row items-start gap-2 justify-between">
                    <div>
                        <h2 className="text-[#393939] text-sm md:text-lg font-bold">Calificaciones y Reseñas</h2>
                        <span className="text-[#393939] text-[12px] md:text-[13px] font-semibold">
                            {totalCalificaciones > 0
                                ? `${promedio.toFixed(1)} ★ - ${totalCalificaciones} reseña${totalCalificaciones !== 1 ? 's' : ''}`
                                : 'Sé el primero en calificar'
                            }
                        </span>
                    </div>
                    <button
                        onClick={() => user ? setShowModalReview(true) : setErrorMessage('Debes iniciar sesión para calificar')}
                        className="text-white text-[12px] md:text-[12px] font-bold bg-[#EB8369] rounded-[10px] w-[100px] h-[30px] hover:bg-[#dd7059] transition"
                    >
                        Escribir
                    </button>
                </div>

                {errorMessage && (
                    <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-3 text-sm">
                        {errorMessage}
                    </div>
                )}

                <span className="text-[#393939] text-[12px] md:text-[13px] font-semibold mt-4 mb-2">
                    Conoce la experiencia de nuestros inquilinos
                </span>
                <div className="w-full min-h-[250px] max-h-[400px] rounded-[10px] border-[1px] border-[#C7C7C7] p-10 flex flex-col items-start gap-3 bg-[#F3F4F6] overflow-y-scroll custom-scrollbar">
                    {calificaciones.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <p className="text-gray-500 text-sm">No hay reseñas aún. Sé el primero en compartir tu experiencia.</p>
                        </div>
                    ) : (
                        calificaciones.map((cal) => (
                            <CardReview key={cal.id} calificacion={cal} />
                        ))
                    )}
                </div>
            </div>
            <Footer />

            {/* Modal para escribir reseña */}
            {/* Dentro de Servicio.tsx, al final antes del Footer */}

            {showModalReview && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/60 backdrop-blur-md p-4 overflow-y-auto">
                    <div
                        className="absolute inset-0"
                        onClick={() => setShowModalReview(false)}
                    />
                    <div className="relative z-10">
                        <ModalReview
                            onClose={() => {
                                setShowModalReview(false)
                                setErrorMessage('')
                            }}
                            onSubmit={handleSubmitReview}
                            publicacionTitulo={publication.titulo}
                        />
                    </div>
                </div>
            )}

        </>
    )
}