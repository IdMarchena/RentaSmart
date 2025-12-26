import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import imgSearch from "../assets/search.png"
import imgRow from "../assets/row.png"
import { CardPublications } from "../components/CardPublications";

export const Publications = () => {
    return (
        <>
            <Header />
            
            <div className="w-full  py-8 px-5">
                <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
                    <h1 className="text-[#393939] text-2xl md:text-4xl font-bold text-center mb-2">Encuentra tu lugar ideal</h1>
                    <p className="text-[#6B7280] text-sm md:text-base text-center mb-8">Explora las mejores opciones de arriendo con filtros personalizados</p>

                    <div className="w-full md:w-[90%] lg:w-[85%] bg-[#FFFEF8] shadow-lg rounded-[15px] p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-3 md:gap-4 w-full">
                            <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-3 md:gap-4 w-full md:flex-1">
                                <div className="relative w-full md:w-[20%] h-[40px]">
                                    <input
                                        type="text"
                                        placeholder="Ubicación"
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-10 pr-4 text-sm font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => console.log('Buscar en:',  /* valor del input */)}
                                        className="absolute top-1/2 left-2 transform -translate-y-1/2 w-[20px] h-[20px] p-0 m-0"
                                    >
                                        <img src={imgSearch} alt="Buscar" className="w-full h-full" />
                                    </button>
                                </div>
                                <div className="relative w-full md:w-[15%] h-[40px]">
                                    <input
                                        type="text"
                                        placeholder="Tipo Inmueble"
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-4 text-sm font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => console.log('Buscar en:', /* valor del input */)}
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0"
                                    >
                                        <img src={imgRow} alt="Buscar" className="w-full h-full" />
                                    </button>
                                </div>
                                <div className="relative w-full md:w-[15%] h-[40px]">
                                    <input
                                        type="text"
                                        placeholder="Precio Minimo"
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-4 text-sm font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => console.log('Buscar en:', /* valor del input */)}
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0"
                                    >
                                        <img src={imgRow} alt="Buscar" className="w-full h-full" />
                                    </button>
                                </div>
                                <div className="relative w-full md:w-[15%] h-[40px]">
                                    <input
                                        type="text"
                                        placeholder="Precio Maximo"
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-4 text-sm font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => console.log('Buscar en:', /* valor del input */)}
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0"
                                    >
                                        <img src={imgRow} alt="Buscar" className="w-full h-full" />
                                    </button>
                                </div>
                                <div className="relative w-full md:w-[15%] h-[40px]">
                                    <input
                                        type="text"
                                        placeholder="Filtrar por m2 "
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-4 text-sm font-bold"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => console.log('Buscar en:', /* valor del input */)}
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0"
                                    >
                                        <img src={imgRow} alt="Buscar" className="w-full h-full" />
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => console.log('Aplicar filtros')}
                                className="w-full md:w-auto bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-2 px-6 rounded-[10px] h-[40px] transition-colors duration-200 shadow-md"
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full p-5 ">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[95%] h-auto  flex flex-col items-start p-4 md:p-8 bg-[#F8F6E8] rounded-[10px]">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-5 gap-2 sm:gap-0">
                            <h1 className="text-[#393939] text-sm md:text-md lg:text-lg font-bold">Mejores Publicaciones</h1>
                            <div className="text-xs md:text-sm text-[#6B7280]">
                                <span className="font-semibold">4 propiedades disponibles</span>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center md:justify-start gap-3 md:gap-5 overflow-y-scroll custom-scrollbar w-full h-auto md:h-[99vh] pb-5">
                            <CardPublications />
                            <CardPublications />
                            <CardPublications />
                            <CardPublications />
                            <CardPublications />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}