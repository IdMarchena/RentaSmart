import { Header } from "../components/Header";
import banner from "../assets/banner.jpg"
import imgMaps from "../assets/maps.png"
import imgRow from "../assets/row.png"
import imgTranfer from "../assets/transfer.png"
import imgSearch from "../assets/search.png"
import imgMenu from "../assets/menu.png"
import imgApartment from "../assets/Apartment.webp"
import { Footer } from "../components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Cards } from "../components/Cards";

export const Home = () => {
    return (
        <>
            <div className="w-full h-screen">
                <Header />
                <div className="w-full h-full p-5 mt-5 flex flex-col items-center">
                    <img src={banner} alt="banner" className="w-full h-[440px] md:h-[500px] rounded-[30px] opacity-[70%] object-cover"/>
                    <h1 className="text-[#393939] text-[30px] md:text-[50px] font-bold absolute mt-[160px]">Encuentra Tu Nuevo Hogar</h1>
                    <div className="w-[50%] h-[80px] bg-[#FEFEFE] flex flex-row items-center  rounded-[30px] absolute md:mt-[450px] mt-[400px] opacity-[99%] shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
                        <div className="w-[30%] h-full flex flex-col items-start justify-center ml-5 border-short-r">
                            <h2 className="text-[#393939] text-[12px] md:text-[14px] font-bold">Locación</h2>
                            <div className="flex flex-row items-center gap-2 mr-3">
                                <span className="text-[#EB8369] text-[10px] md:text-[14px] font-semibold">Selecciona tu ciudad</span>
                                <img src={imgMaps} alt="maps" className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                        <div className="w-[30%] h-full flex flex-col items-start justify-center ml-5 border-short-r">
                            <h2 className="text-[#393939] text-[12px] md:text-[14px] font-bold">Tipo Inmueble</h2>
                            <div className="flex flex-row items-center gap-2 mr-3">
                                <span className="text-[#EB8369] text-[10px] md:text-[14px] font-semibold">Selecciona un tipo</span>
                                <img src={imgRow} alt="maps" className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                        <div className="w-[30%] h-full flex flex-col items-start justify-center ml-5 border-short-r">
                            <h2 className="text-[#393939] text-[12px] md:text-[14px] font-bold">Rango Precio</h2>
                            <div className="flex flex-row items-center gap-2 mr-3">
                                <span className="text-[#EB8369] text-[10px] md:text-[14px] font-semibold">Selecciona tu precio</span>
                                <img src={imgTranfer} alt="maps" className="w-[20px] h-[20px]" />
                            </div>
                        </div>
                        <div className="w-[15%] h-full flex flex-col items-center justify-center">
                            <img src={imgSearch} alt="maps" className="w-[30px] h-[30px]" />
                        </div>
                        
                    </div>

                </div>
            </div>
            <div className="w-full h-auto ">
                <div className="w-full h-[50px] flex flex-row items-center justify-between p-5">
                    <h2 className="text-[#EB8369] text-[20px] font-semibold">Apartamentos Disponibles</h2>
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-[#EB8369] text-[12px] font-semibold">Ver todos</span>
                        <img src={imgMenu} alt="menu" className="w-[20px] h-[20px]" />
                    </div>
                </div>
                <div className='relative w-full px-12 mt-10'>
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem className="w-full flex flex-row items-start justify-start gap-5">
                                <Cards />
                                <Cards />
                                <Cards />
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious className='max-[500px]:absolute max-[500px]:left-0 max-[500px]:size-10' />
                        <CarouselNext className='max-[500px]:absolute max-[500px]:right-0 max-[500px]:size-10' />
                    </Carousel>
                </div>

            </div>
            <div className="w-full h-auto  mb-20">
                <div className="w-full h-full flex flex-row items-center justify-center  ">
                    <img src={imgApartment} alt="apartment" className="w-[500px] h-[500px]" />
                    <div className="flex flex-col items-center justify-center w-[50%] ml-10">
                        <h2 className="text-[#EB8369] text-[20px] font-semibold">¿Qué hacemos en RentaSmart?</h2>
                        <br/>
                        <p className="text-[#393939] text-[12px] md:text-[14px] font-semibold">En <span className="text-[#EB8369]">RentaSmart</span>, transformamos la forma en que se arriendan apartamentos y habitaciones. Ofrecemos una plataforma digital segura,
                            moderna y fácil de usar que conecta a propietarios con personas que buscan un espacio cómodo y confiable para vivir. Facilitamos
                            todo el proceso: desde la publicación del inmueble hasta la gestión de solicitudes, contratos y pagos.
                        </p> 
                        <br/>
                        <p className="text-[#393939] text-[12px] md:text-[14px] font-semibold">Ya seas propietario o arrendatario, <span className="text-[#EB8369]">RentaSmart</span> pone en tus manos todas las herramientas necesarias para hacer del arriendo una
                         experiencia transparente, ágil y sin complicaciones.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}