import { Header } from "../components/Header";
import banner from "../assets/banner.jpg"
import imgMaps from "../assets/maps.png"
import imgRow from "../assets/row.png"
import imgSearch from "../assets/search.png"
import imgMenu from "../assets/menu.png"
import imgApartment from "../assets/Apartment.webp"
import { Footer } from "../components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Cards } from "../components/Cards";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useResponsiveCards } from "../hooks/useResponsiveCards";
import { usePublicaciones } from '@/hooks/usePublicaciones'
import type { PublicationFilters } from "../hooks/useFilters";


export const Home = () => {
    const [openLocation, setOpenLocation] = useState(false);
    const [cityList, setCityList] = useState([]);
    
    const [filters, setFilters] = useState<PublicationFilters>({
        ubicacion: '',
        tipoInmueble: '',
        precioMinimo: 0,
        precioMaximo: 0,
        estrato: ''
    });

    // Busca ciudades al montar
    useEffect(() => {
        fetch('https://api-colombia.com/api/v1/city')
            .then(r => r.json())
            .then(data => setCityList(data.map((c: any) => c.name)));
    }, []);

    const cardsToShow = useResponsiveCards();
    const { publicationsHome, getTop6 } = usePublicaciones();

    // Cargar top 6 publicaciones para el home
    useEffect(() => {
        getTop6();
    }, [getTop6]);

    const handleSearch = () => {
        // Convertir filtros al formato esperado por Publications.tsx
        const filtersState = {
            city: filters.ubicacion,
            type: filters.tipoInmueble,
            priceMin: filters.precioMinimo,
            priceMax: filters.precioMaximo,
            estrato: filters.estrato
        };
        
        // Redirigir a Publications con los filtros
        window.location.href = `/publications?filters=${encodeURIComponent(JSON.stringify(filtersState))}`;
    };

    const handleClearFilters = () => {
        setFilters({
            ubicacion: '',
            tipoInmueble: '',
            precioMinimo: 0,
            precioMaximo: 0,
            estrato: ''
        });
        setOpenLocation(false);
    };

    return (
        <>
            <div className="w-full h-screen">
                <Header />
                <div className="w-full h-full p-5 mt-5 flex flex-col items-center">
                    <img src={banner} alt="banner" className="w-full h-[350px] sm:h-[400px] md:h-[500px] rounded-[30px] opacity-[70%] object-cover" />
                    <h1 className="text-[#393939] text-[24px] sm:text-[35px] md:text-[50px] font-bold absolute mt-[100px] sm:mt-[140px] md:mt-[160px] text-center md:text-left px-4">Encuentra Tu Nuevo Hogar</h1>
                    <div className="w-[90%] md:w-[85%] lg:w-[70%] bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl p-6 absolute mt-[280px] sm:mt-[350px] md:mt-[420px]">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            {/* Ubicación */}
                            

                            {/* Tipo Inmueble */}
                            

                            {/* Precio Mínimo */}
                            

                            {/* Precio Máximo */}
                            

                            {/* Estrato */}
                            
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleSearch}
                                className="flex-1 bg-[#EB8369] hover:bg-[#dd7059] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                            >
                                <img src={imgSearch} alt="buscar" className="w-5 h-5" />
                                Buscar Propiedades
                            </button>

                        </div>
                    </div>

                </div>
            </div>
            
            {/* Espacio adicional para evitar superposición */}
            <div className="h-[200px] md:h-[250px]"></div>
            
            <div className="w-full h-auto">
                <div className="w-full h-[50px] flex flex-row items-center justify-between p-5">
                    <h2 className="text-[#EB8369] text-[15px] md:text-[20px] font-semibold">Top 6 Publicaciones</h2>
                    <div className="flex flex-row items-center gap-2">
                        <button
                            onClick={handleSearch}
                            className="flex-1 bg-[#EB8369] hover:bg-[#dd7059] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center gap-2"
                        >
                            ver todas
                        </button>
                        
                        
                    </div>
                </div>
                <div className='relative w-full px-4 sm:px-8 md:px-12 mt-10'>
                    <Carousel>
                        <CarouselContent>
                            {Array.from({ length: Math.ceil(publicationsHome?.length / cardsToShow) }).map((_, groupIndex) => (
                                <CarouselItem key={groupIndex} className="w-full flex flex-row items-start justify-center gap-5">
                                    {Array.from({ length: cardsToShow }).map((_, cardIndex) => {
                                        const totalIndex = groupIndex * cardsToShow + cardIndex;
                                        return totalIndex < publicationsHome?.length ? <Cards key={totalIndex} publication={publicationsHome?.[totalIndex]} /> : null;
                                    })}
                                </CarouselItem>
                            ))}

                        </CarouselContent>
                        <CarouselPrevious className='max-[500px]:absolute max-[500px]:left-0 max-[500px]:size-10' />
                        <CarouselNext className='max-[500px]:absolute max-[500px]:right-0 max-[500px]:size-10' />
                    </Carousel>
                </div>
            </div>
            <div className="w-full h-auto  mb-20">
                <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center px-5">
                    <img src={imgApartment} alt="apartment" className="hidden sm:block w-full sm:w-[400px] lg:w-[500px] h-auto lg:h-[500px]" />
                    <div className="flex flex-col items-center justify-center w-full lg:w-[50%] mt-8 lg:mt-0 lg:ml-10">
                        <h2 className="text-[#EB8369] text-[18px] md:text-[20px] font-semibold text-center lg:text-left">¿Qué hacemos en RentaSmart?</h2>
                        <br />
                        <p className="text-[#393939] text-[12px] md:text-[14px] font-semibold text-center lg:text-left">En <span className="text-[#EB8369]">RentaSmart</span>, transformamos la forma en que se arriendan apartamentos y habitaciones. Ofrecemos una plataforma digital segura,
                            moderna y fácil de usar que conecta a propietarios con personas que buscan un espacio cómodo y confiable para vivir. Facilitamos
                            todo el proceso: desde la publicación del inmueble hasta la gestión de solicitudes, contratos y pagos.
                        </p>
                        <br />
                        <p className="text-[#393939] text-[12px] md:text-[14px] font-semibold text-center lg:text-left">Ya seas propietario o arrendatario, <span className="text-[#EB8369]">RentaSmart</span> pone en tus manos todas las herramientas necesarias para hacer del arriendo una
                            experiencia transparente, ágil y sin complicaciones.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}