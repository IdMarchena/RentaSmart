import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CardPublications } from "../components/CardPublications";
import type { PublicationFilters } from "../hooks/useFilters";
import { usePublicaciones } from '@/hooks/usePublicaciones'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import imgRow from "../assets/row.png";
import imgMaps from "../assets/maps.png";

export const Publications = () => {
    const location = useLocation();
    const { publications, getAll, loading, error, getByUbicacion, getByTipoInmueble, getByEstrato, getByPrecioMenor, getByPrecioMayor, getByPrecioRango } = usePublicaciones();

    const [openLocation, setOpenLocation] = useState(false);
    const [cityList, setCityList] = useState<string[]>([]);

    const [filters, setFilters] = useState<PublicationFilters>({
        ubicacion: '',
        tipoInmueble: '',
        precioMinimo: 0,
        precioMaximo: 0,
        estrato: ''
    });

    useEffect(() => {
        fetch('https://api-colombia.com/api/v1/city')
            .then(r => r.json())
            .then(data => setCityList(data.map((c: any) => c.name)));
    }, []);

    // Cargar todas las publicaciones del backend
    useEffect(() => {
        getAll();
    }, []);

    useEffect(() => {
        const initialFilters = location.state?.filters;
        if (initialFilters) {
            setFilters({
                ubicacion: initialFilters.city || '',
                tipoInmueble: initialFilters.type || '',
                precioMinimo: initialFilters.priceMin || 0,
                precioMaximo: initialFilters.priceMax || 0,
                estrato: initialFilters.estrato || ''
            });
        }
    }, [location.state]);

    const getFilteredPublications = async (filters: PublicationFilters) => {
        try {
            // Lógica de precios - ahora usa los métodos correctos del backend
            if (filters.precioMinimo && filters.precioMaximo) {
                // Rango de precios
                await getByPrecioRango(filters.precioMinimo, filters.precioMaximo);
                return;
            } else if (filters.precioMinimo) {
                // Solo precio mínimo
                await getByPrecioMenor(filters.precioMinimo);
                return;
            } else if (filters.precioMaximo) {
                // Solo precio máximo
                await getByPrecioMayor(filters.precioMaximo);
                return;
            }
            
            // Si hay ubicación, filtrar por ubicación
            if (filters.ubicacion) {
                await getByUbicacion(filters.ubicacion);
                return;
            }
            
            // Si hay tipo de inmueble, filtrar por tipo
            if (filters.tipoInmueble) {
                await getByTipoInmueble(filters.tipoInmueble);
                return;
            }
            
            // Si hay estrato, filtrar por estrato
            if (filters.estrato) {
                await getByEstrato(filters.estrato);
                return;
            }
            
            // Si no hay filtros específicos, cargar todas
            await getAll();
        } catch (error) {
            console.error('Error al filtrar publicaciones:', error);
        }
    };

    const handleSearch = () => {
        getFilteredPublications(filters);
    };

    const handleClearFilters = () => {
        setFilters({
            ubicacion: '',
            tipoInmueble: '',
            precioMinimo: 0,
            precioMaximo: 0,
            estrato: ''
        });
        getAll(); // Cargar todas las publicaciones
    };

    return (
        <>
            <Header />

            <div className="w-full py-8 px-5">
                <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
                    <h1 className="text-[#393939] text-2xl md:text-4xl font-bold text-center mb-2">Encuentra tu lugar ideal</h1>
                    <p className="text-[#6B7280] text-sm md:text-base text-center mb-8">Explora las mejores opciones de arriendo con filtros personalizados</p>

                    <div className="w-full md:w-[90%] lg:w-[85%] bg-[#FFFEF8] shadow-lg rounded-[15px] p-4 md:p-6 relative">
                        <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 w-full">
                            <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full">
                                <div className="relative flex-shrink-0 w-full md:w-[180px] h-[40px]">
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
                                            <input
                                                type="text"
                                                placeholder="Escribe para buscar ciudad..."
                                                value={filters.ubicacion}
                                                onChange={e => setFilters({ ...filters, ubicacion: e.target.value })}
                                                className="w-full h-[40px] rounded-[10px] text-[#393939] text-[12px] font-medium px-3 border border-[#BCBBB0] focus:outline-none focus:border-[#EB8369] mb-2"
                                                autoFocus
                                            />
                                            <div className="max-h-[200px] overflow-y-auto custom-scrollbar mb-2">
                                                {cityList
                                                    .filter((city: string) =>
                                                        city.toLowerCase().includes((filters.ubicacion || '').toLowerCase())
                                                    )
                                                    .slice(0, 10)
                                                    .map((city: string) => (
                                                        <div
                                                            key={city}
                                                            onClick={() => {
                                                                setFilters({ ...filters, ubicacion: city })
                                                                setOpenLocation(false)
                                                            }}
                                                            className="px-3 py-2 hover:bg-[#FFF5F2] cursor-pointer rounded-md text-[#393939] text-[12px] font-medium transition border-b last:border-b-0"
                                                        >
                                                            {city}
                                                        </div>
                                                    ))}
                                                {cityList.filter((city: string) =>
                                                    city.toLowerCase().includes((filters.ubicacion || '').toLowerCase())
                                                ).length === 0 && (
                                                        <div className="px-3 py-2 text-gray-500 text-[12px] text-center">
                                                            No se encontraron ciudades
                                                        </div>
                                                    )}
                                            </div>
                                            <button
                                                onClick={() => setOpenLocation(false)}
                                                className="w-full h-[35px] bg-[#EB8369] rounded-[10px] text-white text-[12px] font-bold hover:bg-[#dd7059] transition"
                                            >
                                                Aplicar
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="relative flex-shrink-0 w-full md:w-[180px] h-[40px]">
                                    <select
                                        value={filters.tipoInmueble}
                                        onChange={(e) => setFilters({ ...filters, tipoInmueble: e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold appearance-none"
                                    >
                                        <option value="">Tipo Inmueble</option>
                                        <option value="APARTAMENTO">Apartamento</option>
                                        <option value="APARTAESTUDIO">Apartaestudio</option>
                                        <option value="CASA">Casa</option>
                                        <option value="OFICINA">Oficina</option>
                                        <option value="LOCAL_COMERCIAL">Local Comercial</option>
                                        <option value="PISO">Piso</option>
                                        <option value="CHALET">Chalet</option>
                                        <option value="ESTUDIO">Estudio</option>
                                        <option value="LOFT">Loft</option>
                                        <option value="VIVIENDA_RURAL">Vivienda Rural</option>
                                        <option value="CASA_CAMPO">Casa de Campo</option>
                                        <option value="BODEGA">Bodega</option>
                                        <option value="HABITACION">Habitación</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0 pointer-events-none"
                                    >
                                        <img src={imgRow} alt="Dropdown" className="w-full h-full" />
                                    </button>
                                </div>

                                <div className="relative flex-shrink-0 w-full md:w-[140px] h-[40px]">
                                    <input
                                        type="number"
                                        placeholder="Precio Mínimo"
                                        value={filters.precioMinimo || ''}
                                        onChange={(e) => setFilters({ ...filters, precioMinimo: +e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold"
                                    />
                                </div>

                                <div className="relative flex-shrink-0 w-full md:w-[140px] h-[40px]">
                                    <input
                                        type="number"
                                        placeholder="Precio Máximo"
                                        value={filters.precioMaximo || ''}
                                        onChange={(e) => setFilters({ ...filters, precioMaximo: +e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold"
                                    />
                                </div>

                                <div className="relative flex-shrink-0 w-full md:w-[120px] h-[40px]">
                                    <select
                                        value={filters.estrato}
                                        onChange={(e) => setFilters({ ...filters, estrato: e.target.value })}
                                        className="w-full h-full border border-[#BCBBB0] bg-[#FEFEFE] rounded-[10px] pl-4 pr-8 text-sm font-bold appearance-none"
                                    >
                                        <option value="">Estrato</option>
                                        <option value="1">Estrato 1</option>
                                        <option value="2">Estrato 2</option>
                                        <option value="3">Estrato 3</option>
                                        <option value="4">Estrato 4</option>
                                        <option value="5">Estrato 5</option>
                                        <option value="6">Estrato 6</option>
                                    </select>
                                    <button
                                        type="button"
                                        className="absolute top-6 right-2 transform -translate-y-1/2 w-[15px] h-[15px] p-0 m-0 pointer-events-none"
                                    >
                                        <img src={imgRow} alt="Dropdown" className="w-full h-full" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    disabled={loading}
                                    className="flex-shrink-0 w-full md:w-auto bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold py-2 px-6 rounded-[10px] h-[40px] transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Buscando...' : 'Buscar'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    disabled={loading}
                                    className="flex-shrink-0 w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-[10px] h-[40px] transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Limpiar
                                </button>
                            </div>
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
                                    {publications.length} {publications.length === 1 ? 'propiedad disponible' : 'propiedades disponibles'}
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
                        ) : publications.length === 0 ? (
                            <div className="w-full text-center py-20 text-gray-500">
                                No se encontraron publicaciones
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row md:flex-wrap items-center md:items-start justify-center md:justify-start gap-3 md:gap-5 overflow-y-scroll custom-scrollbar w-full h-auto md:h-[99vh] pb-5">
                                {publications.map((publication) => (
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