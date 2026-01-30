import imgBed from "../assets/bed.png"
import imgBath from "../assets/bath.png"
import imgMeda from "../assets/medal.png"
import imgMap from "../assets/maps1.png"
import imgRuler from "../assets/ruler.png"
import imgUsers from "../assets/users.png"
import imgDeliver from "../assets/delivery.png"
import imgRound from "../assets/round.png"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from "react-router-dom"
import type { Publicacion } from "@/types/entitys"
import { usePublicaciones } from "../hooks/usePublicaciones"
import { useFavorito } from "../hooks/useFavorito"
import { useAuthContext } from "../context/AuthContext"
import { useState, useEffect } from "react"

export const CardPublications = ({ publication }: { publication: Publicacion }) => {
    const [promedio, setPromedio] = useState<number>(0)
    const { getPromedioCalificacion } = usePublicaciones()
    const { user } = useAuthContext()
    const { create, remove, getByUsuarioId } = useFavorito()
    const [isFavorito, setIsFavorito] = useState(false)
    const [loadingFav, setLoadingFav] = useState(false)

    useEffect(() => {
        const cargarPromedio = async () => {
            const resultado = await getPromedioCalificacion(publication.id)
            setPromedio(resultado.promedio)
        }
        cargarPromedio()
    }, [publication.id])

    // Verificar si la publicación está en favoritos
    useEffect(() => {
        const checkFavorito = async () => {
            if (user?.id) {
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
    }, [user?.id, publication.id, getByUsuarioId])

    // Manejar like/dislike
    const handleFavorito = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        
        if (!user?.id) {
            alert('Debes iniciar sesión para agregar a favoritos')
            return
        }

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

    const imagenes = publication.multimedia?.sort((a, b) => a.orden - b.orden) || []

    const precioFormateado = publication.precio?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }) || 'N/A'

    const ubicacion = publication.inmueble?.ubicacion?.nombre || 'Ubicación no disponible'

    const descripcionCorta = publication.descripcion?.length > 120
        ? `${publication.descripcion.substring(0, 120)}...`
        : publication.descripcion

    return (
        <div className="w-full md:w-[95%] h-[400px] md:h-[240px] rounded-[10px] overflow-hidden p-3 md:p-5 bg-[#FFFEF8] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] flex flex-col md:flex-row">
            <div className="w-full md:w-[40%] relative">
                {imagenes.length > 0 ? (
                    <Carousel className="w-full">
                        <CarouselContent>
                            {imagenes.map((img, index) => (
                                <CarouselItem key={img.id}>
                                    <img
                                        src={img.url}
                                        alt={`${publication.titulo} - ${index + 1}`}
                                        className="w-full h-[200px] md:h-[190px] object-cover rounded-[10px]"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                    </Carousel>
                ) : (
                    <div className="w-full h-[200px] md:h-[190px] bg-gray-200 rounded-[10px] flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Sin imágenes</span>
                    </div>
                )}
                
                {/* Corazón de favoritos */}
                <button
                    onClick={handleFavorito}
                    disabled={loadingFav}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={isFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                    <svg
                        width="18"
                        height="18"
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
            <div className="w-full md:w-[60%] mt-3 md:mt-0 md:ml-5">
                <h2 className="text-[#393939] text-[16px] md:text-[20px] font-bold">{publication.titulo}</h2>
                <div className="flex flex-row justify-between mb-3 md:mb-5 flex-nowrap">
                    <p className="text-[#A6A6A6] text-xs md:text-sm font-medium">{descripcionCorta}</p>
                    <span className="text-[#EB8369] text-sm md:text-lg font-bold whitespace-nowrap ml-2">{precioFormateado}</span>
                </div>
                <div className="flex flex-row flex-nowrap justify-between gap-2">
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgBed} alt="bed" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {publication.inmueble?.numeroHabitaciones || 0} Hab
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgBath} alt="bath" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {publication.inmueble?.numeroBanos || 0} Baños
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgMeda} alt="rating" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {promedio > 0 ? promedio.toFixed(1) : 'Sin calificaciones'}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgMap} alt="map" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">{ubicacion}</span>
                        </div>
                    </div>

                    {/* Segunda columna de detalles - Oculta en móvil */}
                    <div className="hidden md:flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgRuler} alt="ruler" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {publication.inmueble?.areaTotal || 0} m²
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgRound} alt="round" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {publication.inmueble?.tipo ? (publication.inmueble.tipo.charAt(0).toUpperCase() + publication.inmueble.tipo.slice(1)) : 'N/A'}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgDeliver} alt="deliver" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {publication.inmueble?.estadoInmueble || 'N/A'}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgUsers} alt="users" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                C.{publication.inmueble?.capacidadPersonas || 0} personas
                            </span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-2 flex-nowrap justify-center md:justify-end mt-2 md:mt-0">
                        <span className={`text-xs md:text-sm font-bold px-2 py-1 rounded-[20px] ${publication.estadoPublicacion === 'PUBLICADA'
                            ? 'text-green-700 bg-green-100'
                            : 'text-gray-700 bg-gray-100'
                            }`}>
                            {publication.estadoPublicacion === 'PUBLICADA' ? 'Disponible' : 'No disponible'}
                        </span>
                        <Link
                            to={`/publication/${publication.id}`}
                            className="px-4 py-1 text-xs md:text-sm bg-[#EB8369] text-white font-semibold rounded-[20px] hover:bg-[#dd7059] transition"
                        >
                            Ver más
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}