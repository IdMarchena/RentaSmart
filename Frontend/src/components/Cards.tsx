import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import imgBed from "../assets/bed.png"
import imgBath from "../assets/bath.png"
import imgRuler from "../assets/ruler.png"
import imgMap from "../assets/maps1.png"
import { Link } from "react-router-dom"
import type { PublicacionCompleta } from "../hooks/usePublications"


export const Cards = ({ publication }: { publication: PublicacionCompleta }) => {

    // Obtener imágenes ordenadas
    const imagenes = publication.multimedia?.sort((a: any, b: any) => a.orden - b.orden) || []

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
                        <span>{publication.inmueble?.num_habitaciones} Hab</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgBath} className="w-4 h-4" />
                        <span>{publication.inmueble?.num_banos} Baños</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgRuler} alt="ruler" className="w-4 h-4" />
                        <span className="text-[#393939] text-xs md:text-sm font-bold">
                            {publication.inmueble?.area_total || 0} m²
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
