import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import imgB1 from "../assets/b1.jpg"
import imgB2 from "../assets/b2.jpg"
import imgB3 from "../assets/b3.jpg"
import imgBed from "../assets/bed.png"
import imgBath from "../assets/bath.png"
import imgMeda from "../assets/medal.png"
import imgMap from "../assets/maps1.png"

export const Cards = () => {
    return (
        <div className="w-[500px] h-[500px] rounded-[10px] overflow-hidden ">
            <div className="relative z-10 h-[50%] shadow-[0px_20px_10px_rgba(0,0,0,0.2)]">
                <Carousel className="w-full">
                    <CarouselContent>
                        {[imgB1, imgB2, imgB3].map((img, index) => (
                            <CarouselItem key={index}>
                                <img src={img} alt={`apartment-${index}`} className="w-full h-[260px] object-cover rounded-[10px]" />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                </Carousel>
            </div>
            <div className=" w-full p-4 bg-[#EFEDDE]  border-[1px] border-[#BCBBB0] rounded-[0px_0px_10px_10px] ">
                <div className="flex items-center justify-between text-[#393939]">
                    <span className="text-lg font-bold">Apartamento</span>
                    <span className="text-xl font-bold">$560.000</span>
                </div>
                

                <p className="text-[12px] text-[#6B6B6B] font-semibold">
                    Moderno apartamento de 2 habitaciones ubicado en una zona tranquila y de fácil acceso.
                </p>

                <div className="flex flex-wrap items-center justify-start gap-3 text-[12px] text-[#393939] font-semibold">
                    <div className="flex items-center gap-1">
                        <img src={imgBed} className="w-4 h-4" />
                        <span>2 Hab</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgBath} className="w-4 h-4" />
                        <span>2 Baños</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgMeda} className="w-4 h-4" />
                        <span>4.2</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <img src={imgMap} className="w-4 h-4" />
                        <span>El Prado, Santa Marta</span>
                    </div>
                    <div className="flex justify-end  ">
                        <button className="px-4 py-1 text-sm bg-[#EB8369] text-white font-semibold rounded-[20px] hover:bg-[#dd7059] transition">
                            Ver más
                        </button>
                    </div>
                </div> 
            </div>
        </div>
    )
}
