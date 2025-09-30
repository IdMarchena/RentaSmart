import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
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
import imgUserss from "../assets/userss.png"
import imgWhatsApp from "../assets/whatsapp.png"
import imgMaps from "../assets/maps.jpg"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CardReview } from "../components/CardReview"
export const Publication = () => {
    return (
        <>
            <Header />
            <div className="w-full h-auto p-5 mt-15 flex flex-row items-start gap-10">
                <div className="w-[60%] shadow-[10px_10px_10px_rgba(0,0,0,0.2)] rounded-[10px] ">
                    <Carousel className="w-full">
                        <CarouselContent>
                            {[imgB1, imgB2, imgB3].map((img, index) => (
                                <CarouselItem key={index}>
                                    <img src={img} alt={`apartment-${index}`} className="w-full h-[400px] object-cover rounded-[10px]" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                        <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                    </Carousel>
                </div>
                <div className="w-[40%] flex flex-col items-start">
                    <h2 className="text-[#393939] text-[20px] md:text-[40px] font-bold">Departamento</h2>
                    <br />
                    <p className="text-[#A6A6A6] text-sm md:text-sm font-bold">Moderno apartamento de 2 habitaciones ubicado en una zona tranquila y de fácil acceso.
                        Cuenta con excelente iluminación natural, cocina equipada, balcón con vista panorámica y parqueadero privado.
                        Ideal para familias o profesionales. Cercano a supermercados, transporte público y zonas comerciales.
                        ¡Disponible para arriendo inmediato!
                    </p>
                    <div className=" w-[90%] flex flex-row flex-nowrap justify-between mt-10 mb-10">
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
                    </div>
                    <span className="text-[#EB8369] text-sm md:text-xl font-bold">$2.600.000</span>    
                </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start p-5 mt-10">
                <h1 className="text-[#393939] text-[20px] md:text-[20px] font-bold">Medios de Contacto</h1>
                <div className="w-full flex flex-row items-center justify-between mt-10">
                    <div className="w-[40%] flex flex-col items-start gap-3">
                        <div className="w-full h-[250px]  rounded-[10px] border-[1px] border-[#C7C7C7] p-10 flex flex-col items-start gap-2 bg-[#FEFEFE]">
                            <div className="flex flex-row items-start gap-2">
                                <img src={imgWhatsApp} alt="calendar" className="w-15 h-15 bg-[#DCFCE7] rounded-full p-2" />
                                <div className="flex flex-col items-start">
                                    <h2 className="text-[#393939] text-sm md:text-lg font-bold">WhatsApp</h2>
                                    <span className="text-[#16A34A] text-[12px] md:text-[12px] font-bold">Respuesta inmediata</span>
                                    
                                </div>
                            </div>
                            <span className="text-[#393939] text-[12px] md:text-[13px] font-normal">Chatea directamente con el arrendador a través de WhatsApp. Obtén respuestas rápidas sobre disponibilidad, precios y visitas.</span>
                            <button className="w-full h-[40px] bg-[#5CA978] rounded-[10px] text-white text-[12px] md:text-[12px] font-bold mt-5">Agenda tu cita</button>
                        </div>
                        <div className="w-full h-[250px] rounded-[10px] border-[1px] border-[#C7C7C7] p-10 flex flex-col items-start gap-2 bg-[#FEFEFE]">
                            <div className="flex flex-row items-start gap-2">
                                <img src={imgUserss} alt="users" className="w-15 h-15 bg-[#DBEAFE] rounded-full p-2" />
                                <div className="flex flex-col items-start">
                                    <h2 className="text-[#393939] text-sm md:text-lg font-bold">Chat en Vivo</h2>
                                    <span className="text-[#2684FC] text-[12px] md:text-[12px] font-bold">Uso del canal de la plataforma</span>
                                    
                                </div>
                            </div>
                            <span className="text-[#393939] text-[12px] md:text-[13px] font-normal">Chatea directamente con el arrendador a través de la plataforma en tiempo real. Obtén respuestas rápidas sobre disponibilidad, precios y visitas.</span>
                            <button className="w-full h-[40px] bg-[#68A9FD] rounded-[10px] text-white text-[12px] md:text-[12px] font-bold mt-5">Agenda tu cita</button>
                        </div>
                        
                    </div>
                    <div className="w-[50%]">
                        <img src={imgMaps} alt="maps" className="w-full h-[500px] object-cover rounded-[10px]" />
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex flex-col items-start p-5 mt-10">
                <div className="w-full flex flex-row items-start gap-2 justify-between">
                    <h2 className="text-[#393939] text-sm md:text-lg font-bold">Calificaciones y Reseñas</h2>
                    <button className="text-white text-[12px] md:text-[12px] font-bold bg-[#EB8369] rounded-[10px] w-[100px] h-[30px]">Escribir</button>
                </div>
                <span className="text-[#393939] text-[12px] md:text-[13px] font-semibold mt-2 mb-2">Conoce la experiencia de nuestros inquilinos</span>
                <div className="w-full h-[250px] rounded-[10px] border-[1px] border-[#C7C7C7] p-10 flex flex-col items-start gap-2 bg-[#F3F4F6] overflow-y-scroll custom-scrollbar">
                    <CardReview />
                    <CardReview />
                    <CardReview />
                    <CardReview />
                </div>

            </div>
            <Footer />
        </>
    )
}