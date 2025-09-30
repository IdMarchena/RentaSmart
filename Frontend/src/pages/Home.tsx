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
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";

export const Home = () => {
    const [openLocation, setOpenLocation] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [openPrice, setOpenPrice] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [filters, setFilters] = useState({
        city: '', type: '', priceMin: 0, priceMax: 1000000
    });
    // Busca ciudades al montar
    useEffect(() => {
        fetch('https://api-colombia.com/api/v1/city')
        .then(r => r.json())
        .then(data => setCityList(data.map((c: any) => c.name)));
    }, []);




    return (
        <>
            <div className="w-full h-screen">
                <Header />
                <div className="w-full h-full p-5 mt-5 flex flex-col items-center">
                    <img src={banner} alt="banner" className="w-full h-[440px] md:h-[500px] rounded-[30px] opacity-[70%] object-cover"/>
                    <h1 className="text-[#393939] text-[30px] md:text-[50px] font-bold absolute mt-[160px]">Encuentra Tu Nuevo Hogar</h1>
                    <div className="w-[50%] h-[80px] bg-[#FEFEFE] flex flex-row items-center  rounded-[20px] absolute md:mt-[450px] mt-[400px] opacity-[99%] shadow-[0_10px_10px_rgba(0,0,0,0.2)]">
                        <div className="w-[30%] h-full flex flex-col items-start justify-center border-short-r">
                            <h2 className="text-[#393939] text-[12px] md:text-[14px] font-bold ml-5">Locación</h2>
                            <div className="flex flex-row items-center gap-2 mr-3 ml-5">
                                <span className="text-[#EB8369] text-[10px] md:text-[14px] font-semibold">{filters.city || 'Selecciona tu ciudad'}</span>
                                <img src={imgMaps} alt="maps" className="w-[20px] h-[20px] cursor-pointer" onClick={() => setOpenLocation(true)} />
                            </div>
                            {openLocation && 
                            <div className="absolute top-15 left-0 w-[100%] bg-[#FEFEFE] rounded-[0px_0px_20px_20px] shadow-xl p-4 animate-slideDown">
                                <select
                                    value={filters.city}
                                    onChange={e => setFilters({...filters, city: e.target.value})}
                                    className="w-full h-[20px] rounded-[10px] text-[#393939] text-[12px] font-bold"
                                >
                                    <option value="">Ciudades</option>
                                    {cityList.map(ci => <option key={ci} value={ci}>{ci}</option>)}
                                </select>
                                <button onClick={() => setOpenLocation(false)} className="w-full h-[20px] bg-[#EB8369] rounded-[10px] text-white text-[12px] font-bold">Aplicar</button>
                            </div>}
                        </div>
                        <div className="w-[30%] h-full flex flex-col items-start justify-center border-short-r">
                            <h2 className="text-[#393939] text-[12px] md:text-[14px] font-bold ml-5">Tipo Inmueble</h2>
                            <div className="flex flex-row items-center gap-2 mr-3 ml-5">
                                <span className="text-[#EB8369] text-[10px] md:text-[14px] font-semibold">{filters.type || 'Selecciona un tipo'}</span>
                                <img src={imgRow} alt="maps" className="w-[20px] h-[20px] cursor-pointer" onClick={() => setOpenType(true)} />
                            </div>
                            {openType && 
                            <div className="absolute top-15 left-0 w-[100%] bg-[#FEFEFE] rounded-[0px_0px_20px_20px] shadow-xl p-4 animate-slideDown">
                                <select
                                    value={filters.type}
                                    onChange={e => setFilters({...filters, type: e.target.value})}
                                    className="w-full h-[20px] rounded-[10px] text-[#393939] text-[12px] font-bold"
                                >
                                    <option value="">Selecciona un tipo</option>
                                    <option value="apartamento">Apartamento</option>
                                    <option value="casa">Casa</option>
                                    <option value="habitacion">Habitación</option>
                                </select>
                                <button onClick={() => setOpenType(false)} className="w-full h-[20px] bg-[#EB8369] rounded-[10px] text-white text-[12px] font-bold">Aplicar</button>
                            </div>}
                        </div>
                        <div className="w-[30%] h-full flex flex-col items-start justify-center border-short-r">
                            <h2 className="text-[#393939] text-[12px] md:text-[14px] font-bold ml-5">Rango Precio</h2>
                            <div className="flex flex-row items-center gap-2 mr-3 ml-5">
                                <span className="text-[#EB8369] text-[10px] md:text-[14px] font-semibold">{filters.priceMin} - {filters.priceMax}</span>
                                <img src={imgTranfer} alt="maps" className="w-[20px] h-[20px] cursor-pointer" onClick={() => setOpenPrice(true)} />
                            </div>
                            {openPrice && 
                            <div className="absolute top-15 left-0 w-[100%] bg-[#FEFEFE] rounded-[0px_0px_20px_20px] shadow-xl p-4 animate-slideDown">
                                <div className="flex gap-2">
                                    <input
                                    type="number"
                                    value={filters.priceMin}
                                    onChange={e => setFilters({...filters, priceMin: +e.target.value})}
                                    className="w-full h-[20px] rounded-[10px] text-[#393939] text-[12px] font-bold"
                                    />
                                    <input
                                    type="number"
                                    value={filters.priceMax}
                                    onChange={e => setFilters({...filters, priceMax: +e.target.value})}
                                    className="w-full h-[20px] rounded-[10px] text-[#393939] text-[12px] font-bold"
                                    />
                                </div>
                                <button onClick={() => setOpenPrice(false)} className="w-full h-[20px] bg-[#EB8369] rounded-[10px] text-white text-[12px] font-bold">Aplicar</button>
                            </div>}
                        </div>
                        <button className="w-[15%] h-full flex flex-col items-center justify-center">
                            <img src={imgSearch} alt="maps" className="w-[30px] h-[30px] cursor-pointer" />
                        </button>
                    </div>

                </div>
            </div>
            <div className="w-full h-auto ">
                <div className="w-full h-[50px] flex flex-row items-center justify-between p-5">
                    <h2 className="text-[#EB8369] text-[20px] font-semibold">Apartamentos Disponibles</h2>
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-[#EB8369] text-[12px] font-semibold">Ver todos</span>
                        <Link to="/publications"><img src={imgMenu} alt="menu" className="w-[20px] h-[20px]" /></Link>
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