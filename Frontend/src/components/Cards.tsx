import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import imgBed from "../assets/bed.png"
import imgBath from "../assets/bath.png"
import imgRuler from "../assets/ruler.png"
import imgMap from "../assets/maps1.png"
import { Link } from "react-router-dom"
import type { Publicacion } from "@/types/entitys"
import { useFavorito } from "../hooks/useFavorito"
import { useAuthContext } from "../context/AuthContext"
import { useState, useEffect } from "react"


export const Cards = ({ publication }: { publication: Publicacion }) => {
    const { user } = useAuthContext()
    const { create, remove, getByUsuarioId } = useFavorito()
    const [isFavorito, setIsFavorito] = useState(false)
    const [loadingFav, setLoadingFav] = useState(false)

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
                const favoritos = await getByUsuarioId(parseInt(user.id))
                const favoritoExistente = favoritos.find(fav => fav.publicacion.id === publication.id)
                if (favoritoExistente) {
                    await remove(favoritoExistente.id)
                    setIsFavorito(false)
                }
            } else {
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
                        calificaciones: publication.calificaciones || [],
                        precio: publication.precio || 0,
                        usuario: publication.usuario || { id: 0 } as any,
                        multimedia: (publication.multimedia || []) as any
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

    const imagenes = publication.multimedia?.sort((a: any, b: any) => a.orden - b.orden) || []

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
        <div className="w-[500px] h-[500px] rounded-[10px] overflow-hidden ">
            <div className="relative z-10 h-[50%] shadow-[0px_20px_10px_rgba(0,0,0,0.2)]">
                <Carousel className="w-full">
                    <CarouselContent>
                        {imagenes.map((img, index) => (
                            <CarouselItem key={img.id}>
                                <img src={img.url} alt={`apartment-${index}`} className="w-full h-[260px] object-cover rounded-[10px]" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                </Carousel>
                
                {/* Corazón de favoritos */}
                <button
                    onClick={handleFavorito}
                    disabled={loadingFav}
                    className="absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className=" w-full p-4 bg-[#EFEDDE]  border-[1px] border-[#BCBBB0] rounded-[0px_0px_10px_10px] ">
                <div className="flex items-center justify-between text-[#393939]">
                    <span className="text-lg font-bold">{publication.titulo}</span>
                    <span className="text-xl font-bold">{precioFormateado}</span>
                </div>


                <p className="text-[12px] text-[#6B6B6B] font-semibold">
                    {descripcionCorta}
                </p>

                <div className="flex flex-wrap items-center justify-start gap-4 text-[12px] text-[#393939] font-semibold">
                    <div className="flex items-center gap-1">
                        <img src={imgBed} className="w-4 h-4" />
                        <span>{publication.inmueble?.numeroHabitaciones} Hab</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgBath} className="w-4 h-4" />
                        <span>{publication.inmueble?.numeroBanos} Baños</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgRuler} alt="ruler" className="w-4 h-4" />
                        <span className="text-[#393939] text-xs md:text-sm font-bold">
                            {publication.inmueble?.areaTotal || 0} m²
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgMap} className="w-4 h-4" />
                        <span>{ubicacion}</span>
                    </div>
                    <div className="flex justify-end">
                        <Link to={`/publication/${publication.id}`}>
                            <button className="px-4 py-1 text-sm bg-[#EB8369] text-white font-semibold rounded-[20px] hover:bg-[#dd7059] transition">
                                Ver más
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
