import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Aside } from "../components/Aside"
import { useFavorito } from "../../hooks/useFavorito"
import { useAuthContext } from "../../context/AuthContext"
import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import imgBed from "../../assets/bed.png"
import imgBath from "../../assets/bath.png"
import imgRuler from "../../assets/ruler.png"
import imgMap from "../../assets/maps1.png"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export const FavoritosDash = () => {
    const { user } = useAuthContext()
    const { getByUsuarioId, remove, loading } = useFavorito()
    const [favoritos, setFavoritos] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredFavoritos, setFilteredFavoritos] = useState<any[]>([])

    // Función para cargar favoritos con useCallback para evitar recargas
    // FavoritosDash.tsx corregido
const loadFavoritos = useCallback(async () => {
    if (!user?.id) return;
    
    try {
        // Usamos la función directamente aquí
        const data = await getByUsuarioId(parseInt(user.id));
        setFavoritos(data);
        setFilteredFavoritos(data);
    } catch (error) {
        console.error("Error cargando favoritos:", error);
    }
    // QUITAMOS getByUsuarioId de aquí para romper el bucle
}, [user?.id]);

    // Cargar favoritos solo cuando el usuario cambia
    useEffect(() => {
        loadFavoritos()
    }, [loadFavoritos])

    // Filtrar favoritos sin recargar datos
    useEffect(() => {
        setFilteredFavoritos(
            favoritos.filter(fav => {
                const titulo = fav.publicacion?.titulo || '';
                const descripcion = fav.publicacion?.descripcion || '';
                const ubicacion = fav.publicacion?.inmueble?.ubicacion?.nombre || '';
                
                return titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
            })
        )
    }, [searchTerm, favoritos])

    const handleRemoveFavorito = async (favoritoId: number) => {
        try {
            await remove(favoritoId)
            const updatedFavoritos = favoritos.filter(fav => fav.id !== favoritoId)
            setFavoritos(updatedFavoritos)
            setFilteredFavoritos(updatedFavoritos)
        } catch (error) {
            console.error('Error removing favorito:', error)
            alert('Error al eliminar favorito')
        }
    }

    const precioFormateado = (precio: number) => {
        return precio?.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }) || 'N/A'
    }

    return (
        <>
            <div className="flex">
                <Aside />
                <div className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#393939]">Mis Favoritos</h1>
                            <div className="w-full sm:w-auto">
                                <input
                                    type="text"
                                    placeholder="Buscar favoritos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-64 px-4 py-2 border border-[#BCBBB0] rounded-[10px] focus:outline-none focus:border-[#EB8369]"
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="w-full flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB8369]"></div>
                            </div>
                        ) : filteredFavoritos.length === 0 ? (
                            <div className="w-full text-center py-20">
                                <div className="text-gray-500">
                                    <svg
                                        width="64"
                                        height="64"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="mx-auto mb-4"
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                    </svg>
                                    <p className="text-xl font-semibold mb-2">
                                        {searchTerm ? 'No se encontraron favoritos' : 'No tienes favoritos aún'}
                                    </p>
                                    <p className="text-sm">
                                        {searchTerm 
                                            ? 'Intenta con otros términos de búsqueda' 
                                            : 'Agrega publicaciones a tus favoritos para verlas aquí'
                                        }
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredFavoritos.map((favorito) => (
                                    <div key={favorito.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                        <div className="relative">
                                            {favorito.publicacion.multimedia?.length > 0 ? (
                                                <Carousel className="w-full">
                                                    <CarouselContent>
                                                        {favorito.publicacion.multimedia
                                                            .sort((a: any, b: any) => a.orden - b.orden)
                                                            .map((img: any) => (
                                                                <CarouselItem key={img.id}>
                                                                    <img
                                                                        src={img.url}
                                                                        alt={favorito.publicacion.titulo}
                                                                        className="w-full h-48 object-cover"
                                                                    />
                                                                </CarouselItem>
                                                            ))}
                                                    </CarouselContent>
                                                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                                                    <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full" />
                                                </Carousel>
                                            ) : (
                                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-500">Sin imágenes</span>
                                                </div>
                                            )}
                                            
                                            {/* Botón eliminar favorito */}
                                            <button
                                                onClick={() => handleRemoveFavorito(favorito.id)}
                                                className="absolute top-3 right-3 p-2 bg-red-500/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-600 transition-all duration-200 hover:scale-110"
                                                title="Eliminar de favoritos"
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="white"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M18 6L6 18M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-[#393939] mb-2">
                                                {favorito.publicacion.titulo}
                                            </h3>
                                            
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                {favorito.publicacion.descripcion}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <img src={imgBed} className="w-3 h-3" />
                                                    <span>{favorito.publicacion.inmueble?.numeroHabitaciones || 0} Hab</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <img src={imgBath} className="w-3 h-3" />
                                                    <span>{favorito.publicacion.inmueble?.numeroBanos || 0} Baños</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <img src={imgRuler} className="w-3 h-3" />
                                                    <span>{favorito.publicacion.inmueble?.areaTotal || 0} m²</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <img src={imgMap} className="w-3 h-3" />
                                                    <span>{favorito.publicacion.inmueble?.ubicacion?.nombre || 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-[#EB8369] font-bold text-lg">
                                                    {precioFormateado(favorito.publicacion.precio)}
                                                </span>
                                                <Link
                                                    to={`/publication/${favorito.publicacion.id}`}
                                                    className="px-4 py-2 bg-[#EB8369] text-white text-sm font-semibold rounded-lg hover:bg-[#dd7059] transition-colors duration-200"
                                                >
                                                    Ver más
                                                </Link>
                                            </div>

                                            <div className="mt-2 text-xs text-gray-500">
                                                Agregado el {new Date(favorito.fecha).toLocaleDateString('es-CO')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
