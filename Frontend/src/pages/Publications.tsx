import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import imgBanner from "../assets/baner2.jpg"
import imgSearch from "../assets/search.png"
import imgRow from "../assets/row.png"
import { CardPublications } from "../components/CardPublications";

export const Publications = () => {
    return (
        <>
            <Header />
            <div className="w-full h-screen p-5 mt-5 relative">
                <h1 className="text-[#393939] text-[30px] md:text-[30px] font-bold absolute z-10 mt-[100px] ml-5">Busca Tu Nuevo<br/> Hogar</h1>
                <img src={imgBanner} alt="banner" className="w-full h-[240px] md:h-[300px] rounded-[30px] opacity-[70%] object-cover shadow-[0_10px_10px_rgba(0,0,0,0.2)] relative z-0"/>
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[90%] h-[100vh] flex flex-col flex-wrap items-start p-10 absolute z-10 bg-[#F3F4F6] rounded-[30px] mt-[600px]">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-5">
                            <div className="relative w-[25%] h-[40px] mr-10">
                                <input
                                    type="text"
                                    placeholder="Ubicación"
                                    className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-10 pr-4 text-sm font-bold"
                                />
                                <button
                                    type="button"
                                    onClick={() => console.log('Buscar en:', /* valor del input */)}
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 w-[20px] h-[20px] p-0 m-0"
                                >
                                    <img src={imgSearch} alt="Buscar" className="w-full h-full" />
                                </button>
                            </div>
                            <div className="relative w-[15%] h-[40px]">
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
                            <div className="relative w-[15%] h-[40px]">
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
                            <div className="relative w-[15%] h-[40px]">
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
                            <div className="relative w-[15%] h-[40px]">
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
                        
                        <h1 className="text-[#393939] text-md md:text-lg font-bold mt-10">Mejores Publicaciones</h1>
                        <div className="flex flex-row flex-wrap items-center justify-start gap-5 overflow-y-scroll custom-scrollbar  w-full h-[70vh] mt-5">
                            <CardPublications />
                            <CardPublications />
                            <CardPublications />
                            <CardPublications />
                            <CardPublications />
                            
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="h-[300px]"></div>
            
            <Footer />
        </>
    )
}