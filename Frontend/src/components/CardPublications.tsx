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

export const CardPublications = () => {
    return (
        <div className="w-[95%] h-[250px] rounded-[10px] overflow-hidden p-5 bg-[#FEFEFE] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] flex flex-row">
            <div className="w-[30%]">
                <Carousel className="w-full">
                    <CarouselContent>
                        {[imgB1, imgB2, imgB3].map((img, index) => (
                            <CarouselItem key={index}>
                                <img src={img} alt={`apartment-${index}`} className="w-full h-[210px] object-cover rounded-[10px]" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                </Carousel>
            </div>
            <div className="w-[70%] ml-5">
                <h2 className="text-[#393939] text-[20px] md:text-[20px] font-bold">Departamento</h2>
                <div className="flex flex-row justify-between mb-10 flex-nowrap">
                    <p className="text-[#A6A6A6] text-sm md:text-sm font-bold">Descripcion</p>
                    <span className="text-[#393939] text-sm md:text-lg font-bold">$2.600.000</span>
                </div>
                <div className="flex flex-row flex-nowrap justify-between">
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center">
                            <img src={imgBed} alt="bed" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">2 Hab</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgBath} alt="bath" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">2 Baños</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgMeda} alt="meda" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">4.2</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgMap} alt="map" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">El Prado, Santa Marta</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <div className="flex flex-row items-center">
                            <img src={imgRuler} alt="ruler" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">100 m2</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgRound} alt="round" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">Estrato 4</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgDeliver} alt="deliver" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">Amoblado</span>
                        </div>
                        <div className="flex flex-row items-center">
                            <img src={imgUsers} alt="users" className="w-4 h-4" />
                            <span className="text-[#393939] text-sm md:text-sm font-bold">C.5 personas</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-nowrap justify-end">
                        <span className="text-[#393939] text-sm md:text-sm font-bold bg-[#92C1FD] px-2 py-1 rounded-[20px]">Disponible</span>
                        <button className="px-4 py-1 text-sm bg-[#EB8369] text-white font-semibold rounded-[20px] hover:bg-[#dd7059] transition">
                            Ver más
                        </button>
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}