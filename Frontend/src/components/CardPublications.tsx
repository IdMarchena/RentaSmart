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

interface Multimedia {
    id: number
    url: string
    tipo: string
    es_portada: boolean
    orden: number
}

interface Inmueble {
    id: number
    tipo: string
    titulo: string
    descripcion: string
    ciudad: string
    departamento: string
    direccion: string
    latitud: number
    longitud: number
    area_total: number
    num_habitaciones: number
    num_banos: number
    num_pisos: number
    capacidad_personas: number
    amoblado: boolean
    precio_mensual: number
}

interface PublicacionCompleta {
    id: number
    titulo: string
    descripcion: string
    estado: string
    created_at: string
    inmueble?: Inmueble
    multimedia?: Multimedia[]
}

export const CardPublications = ({ publication }: { publication: PublicacionCompleta }) => {
    // Obtener imágenes ordenadas
    const imagenes = publication.multimedia?.sort((a, b) => a.orden - b.orden) || []

    // Formatear precio
    const precioFormateado = publication.inmueble?.precio_mensual?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }) || 'N/A'

    // Ubicación
    const ubicacion = publication.inmueble?.ciudad || 'Ubicación no disponible'

    // Descripción truncada
    const descripcionCorta = publication.descripcion?.length > 120
        ? `${publication.descripcion.substring(0, 120)}...`
        : publication.descripcion

    return (
        <div className="w-full md:w-[95%] h-[400px] md:h-[240px] rounded-[10px] overflow-hidden p-3 md:p-5 bg-[#FFFEF8] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] flex flex-col md:flex-row">
            <div className="w-full md:w-[40%]">
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
                                {publication.inmueble?.num_habitaciones || 0} Hab
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgBath} alt="bath" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                {publication.inmueble?.num_banos || 0} Baños
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgMeda} alt="rating" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">4.5</span>
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
                                {publication.inmueble?.area_total || 0} m²
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
                                {publication.inmueble?.amoblado ? 'Amoblado' : 'Sin amoblar'}
                            </span>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <img src={imgUsers} alt="users" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">
                                C.{publication.inmueble?.capacidad_personas || 0} personas
                            </span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-2 flex-nowrap justify-center md:justify-end mt-2 md:mt-0">
                        <span className={`text-xs md:text-sm font-bold px-2 py-1 rounded-[20px] ${publication.estado === 'publicada'
                            ? 'text-green-700 bg-green-100'
                            : 'text-gray-700 bg-gray-100'
                            }`}>
                            {publication.estado === 'publicada' ? 'Disponible' : 'No disponible'}
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