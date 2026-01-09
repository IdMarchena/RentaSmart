import imgB1 from "../assets/b1.jpg"
import imgB2 from "../assets/b2.jpg"
import imgB3 from "../assets/b3.jpg"
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
import type { Publicacion } from "../types/entities"

export const CardPublications = ({ publication }: { publication: Publicacion }) => {

    return (
        <div className="w-full md:w-[95%] h-[400px] md:h-[240px] rounded-[10px] overflow-hidden p-3 md:p-5 bg-[#FFFEF8] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] flex flex-col md:flex-row">
            <div className="w-full md:w-[40%]">
                <Carousel className="w-full">
                    <CarouselContent>
                        {[imgB1, imgB2, imgB3].map((img, index) => (
                            <CarouselItem key={index}>
                                <img src={img} alt={`apartment-${index}`} className="w-full h-[200px] md:h-[190px] object-cover rounded-[10px]" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                </Carousel>
            </div>
            <div className="w-full md:w-[60%] mt-3 md:mt-0 md:ml-5">
                <h2 className="text-[#393939] text-[16px] md:text-[20px] font-bold">{publication.inmueble?.nombre}</h2>
                <div className="flex flex-row justify-between mb-3 md:mb-5 flex-nowrap">
                    <p className="text-[#A6A6A6] text-xs md:text-sm font-bold">{publication?.descripcion}</p>
                    <span className="text-[#393939] text-sm md:text-lg font-bold">{publication.inmueble?.precio}</span>
                </div>
                <div className="flex flex-row flex-nowrap justify-between gap-2">
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center">
                            <img src={imgBed} alt="bed" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">2 Hab</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgBath} alt="bath" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">2 Baños</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgMeda} alt="meda" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">{publication.calificaciones?.length}</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgMap} alt="map" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">{publication.inmueble?.ubicacion?.nombre}</span>
                        </div>
                    </div>

                    {/* Segunda columna de detalles - Oculta en móvil */}
                    <div className="hidden md:flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center">
                            <img src={imgRuler} alt="ruler" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">{publication.inmueble?.areaTotal} m2</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgRound} alt="round" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">{publication.inmueble?.estrato} Estrato</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgDeliver} alt="deliver" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">{publication.inmueble?.estadoInmueble}</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgUsers} alt="users" className="w-4 h-4" />
                            <span className="text-[#393939] text-xs md:text-sm font-bold">C.{publication.inmueble?.capacidad} personas</span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-2 flex-nowrap justify-center md:justify-end mt-2 md:mt-0">
                        <span className="text-[#393939] text-xs md:text-sm font-bold bg-[#92C1FD] px-2 py-1 rounded-[20px]">Disponible</span>
                        <Link to={`/publication`} className="px-4 py-1 text-xs md:text-sm bg-[#EB8369] text-white font-semibold rounded-[20px] hover:bg-[#dd7059] transition">
                            Ver más
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}