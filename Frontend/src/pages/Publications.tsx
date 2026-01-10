import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CardPublications } from "../components/CardPublications";
import { useFilters, type PublicationFilters } from "../hooks/useFilters";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import imgRow from "../assets/row.png";
import imgMaps from "../assets/maps.png";

export const Publications = () => {
    const location = useLocation();
    const { filtersPublications, loading, error, getFilteredPublications } = useFilters();

    const [openLocation, setOpenLocation] = useState(false);
    const [cityList, setCityList] = useState<string[]>([]);

    const [filters, setFilters] = useState<PublicationFilters>({
        ubicacion: '',
        tipoInmueble: '',
        precioMinimo: 0,
        precioMaximo: 0
    });

    useEffect(() => {
        fetch('https://api-colombia.com/api/v1/city')
            .then(r => r.json())
            .then(data => setCityList(data.map((c: any) => c.name)));
    }, []);

    useEffect(() => {
        const initialFilters = location.state?.filters;
        if (initialFilters) {
            setFilters({
                ubicacion: initialFilters.city || '',
                tipoInmueble: initialFilters.type || '',
                precioMinimo: initialFilters.priceMin || 0,
                precioMaximo: initialFilters.priceMax || 0
            });
        }
    }, [location.state]);

    useEffect(() => {
        getFilteredPublications(filters);
    }, [filters]);

    const handleSearch = () => {
        getFilteredPublications(filters);
    };

    return (
        <>
            <Header />

            <div className="w-full py-8 px-5">
                <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
                    <h1 className="text-[#393939] text-2xl md:text-4xl font-bold text-center mb-2">Encuentra tu lugar ideal</h1>
                    <p className="text-[#6B7280] text-sm md:text-base text-center mb-8">Explora las mejores opciones de arriendo con filtros personalizados</p>

                    <div className="w-full md:w-[90%] lg:w-[85%] bg-[#FFFEF8] shadow-lg rounded-[15px] p-4 md:p-6 relative">
                        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-3 md:gap-4 w-full">
                            <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-3 md:gap-4 w-full md:flex-1">
                                <div className="relative w-full md:w-[20%] h-[40px]">
                                    <input
                                        type="text"
                                        placeholder="Ubicación"
                                        value={filters.ubicacion}
                                        readOnly
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-10 pr-4 text-sm font-bold cursor-pointer"
                                        onClick={() => setOpenLocation(!openLocation)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setOpenLocation(!openLocation)}
                                        className="absolute top-1/2 left-2 transform -translate-y-1/2 w-[20px] h-[20px] p-0 m-0"
                                    >
                                        <img src={imgMaps} alt="Ubicación" className="w-full h-full" />
                                    </button>

                                    {openLocation && (
                                        <div className="absolute top-full left-0 w-full bg-[#FEFEFE] rounded-[0px_0px_10px_10px] shadow-xl p-4 z-50 mt-1 animate-slideDown">
                                            <select
                                                value={filters.ubicacion}
                                                onChange={e => setFilters({ ...filters, ubicacion: e.target.value })}
                                                className="w-full h-[30px] rounded-[10px] text-[#393939] text-[12px] font-bold mb-2 px-2 border border-[#BCBBB0]"
                                            >
                                                <option value="">Selecciona una ciudad</option>
                                                {cityList.map(city => (
                                                    <option key={city} value={city}>{city}</option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() => setOpenLocation(false)}
                                                className="w-full h-[30px] bg-[#EB8369] rounded-[10px] text-white text-[12px] font-bold hover:bg-[#dd7059] transition"
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="relative w-full md:w-[20%] h-[40px]">
                                    <select
                                        value={filters.tipoInmueble}
                                        onChange={(e) => setFilters({ ...filters, tipoInmueble: e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold appearance-none"
                                    >
                                        <option value="">Tipo Inmueble</option>
                                        <option value="Apartamento">Apartamento</option>
                                        <option value="Casa">Casa</option>
                                        <option value="Habitación">Habitación</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0 pointer-events-none"
                                    >
                                        <img src={imgRow} alt="Dropdown" className="w-full h-full" />
                                    </button>
                                </div>

                                <div className="relative w-full md:w-[20%] h-[40px]">
                                    <input
                                        type="number"
                                        placeholder="Precio Mínimo"
                                        value={filters.precioMinimo || ''}
                                        onChange={(e) => setFilters({ ...filters, precioMinimo: +e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold"
                                    />
                                </div>

                                <div className="relative w-full md:w-[20%] h-[40px]">
                                    <input
                                        type="number"
                                        placeholder="Precio Máximo"
                                        value={filters.precioMaximo || ''}
                                        onChange={(e) => setFilters({ ...filters, precioMaximo: +e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold"
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleSearch}
                                disabled={loading}
                                className="w-full md:w-auto bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-2 px-6 rounded-[10px] h-[40px] transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full p-5">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-[95%] h-auto flex flex-col items-start p-4 md:p-8 bg-[#F8F6E8] rounded-[10px]">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mb-5 gap-2 sm:gap-0">
                            <h1 className="text-[#393939] text-sm md:text-md lg:text-lg font-bold">Mejores Publicaciones</h1>
                            <div className="text-xs md:text-sm text-[#6B7280]">
                                <span className="font-semibold">
                                    {filtersPublications.length} {filtersPublications.length === 1 ? 'propiedad disponible' : 'propiedades disponibles'}
                                </span>
                            </div>
                        </div>

                        {error && (
                            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="w-full flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB8369]"></div>
                            </div>
                        ) : filtersPublications.length === 0 ? (
                            <div className="w-full text-center py-20 text-gray-500">
                                No se encontraron publicaciones con los filtros seleccionados
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center md:justify-start gap-3 md:gap-5 overflow-y-scroll custom-scrollbar w-full h-auto md:h-[99vh] pb-5">
                                {filtersPublications.map((publication) => (
                                    <CardPublications key={publication.id} publication={publication} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};