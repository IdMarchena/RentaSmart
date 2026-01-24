import { useState, useEffect } from "react";
import { Aside } from "../components/Aside";
import imgUserAdmin from "../../assets/admin.png";
import { CardServicios } from "@/admin/components/CardServicios.tsx";
import imgSearch from "../../assets/search.png";
import { CardSearchServicios } from "@/admin/components/CardSearchServicios.tsx";
import { Link } from "react-router-dom";
import { useServicio } from "@/hooks/useServicio";
import type { Servicio } from "@/types/entitys";

export const ServiciosDash = () => {
    const { getAll, getByName, loading } = useServicio();
    
    // Estados para los datos reales
    const [todosLosServicios, setTodosLosServicios] = useState<Servicio[]>([]);
    const [resultadosBusqueda, setResultadosBusqueda] = useState<Servicio[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Cargar todos los servicios al montar el componente
    useEffect(() => {
        const fetchAll = async () => {
            const data = await getAll();
            setTodosLosServicios(data);
        };
        fetchAll();
    }, []);

    // 2. Lógica de búsqueda con debounce (0.5 segundos de espera)
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm.trim().length > 0) {
                const results = await getByName(searchTerm);
                setResultadosBusqueda(results);
            } else {
                setResultadosBusqueda([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3 cursor-pointer">
                    <h1 className="text-[#393939] text-[20px] font-bold">  Servicios</h1>
                    <Link 
                        to="/admin/servicesAdmin"
                        className="h-[35px] flex flex-row items-center justify-center gap-1 rounded-[10px] bg-[#EB8369] p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform"
                    >
                        <img src={imgUserAdmin} alt="" className="w-[20px] h-[20px] object-cover" />
                        <span className="text-[#FFFFFF] text-[12px] font-bold">Profesional</span>
                    </Link>
                </div>

                <div className="w-full h-[100vh] flex flex-row items-center justify-start gap-10 mt-5 max-[890px]:flex-col max-[890px]:h-[200vh]">
                    {/* PANEL IZQUIERDO: Todos los servicios */}
                    <div className="w-[50%] h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[100vh]">
                        {loading && todosLosServicios.length === 0 ? (
                            <p className="text-sm font-bold opacity-50">Cargando catálogo...</p>
                        ) : (
                            todosLosServicios.map((s) => (
                                <CardServicios key={s.id} servicio={s} />
                            ))
                        )}
                    </div>

                    {/* PANEL DERECHO: Buscador */}
                    <div className="w-[50%] h-[100vh] flex flex-col items-center justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-x-hidden p-5 max-[890px]:w-full">
                        <div className="w-full h-auto flex flex-row items-center justify-between gap-2">
                            <h1 className="text-[#393939] font-bold text-[15px] whitespace-nowrap">Encontrar Servicios</h1>
                            <div className="w-[60%] flex flex-row items-center gap-1 bg-[#FEFCEC] border border-[#BCBBB0] rounded-[20px] px-3">
                                <img src={imgSearch} alt="" className="w-[18px] h-[18px] object-cover" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="¿Qué Servicio Necesitas?"
                                    className="bg-transparent text-sm font-bold w-full h-[40px] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="w-full h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full">
                            {searchTerm.length > 0 ? (
                                resultadosBusqueda.length > 0 ? (
                                    resultadosBusqueda.map((s) => (
                                        <CardSearchServicios key={s.id} servicio={s} />
                                    ))
                                ) : (
                                    <p className="text-xs text-gray-500">No se encontraron servicios con ese nombre.</p>
                                )
                            ) : (
                                <p className="text-xs text-gray-500 italic text-center w-full">Escribe algo arriba para buscar...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};