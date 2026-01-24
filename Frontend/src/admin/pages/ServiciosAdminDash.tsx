import { useState, useEffect } from "react"; 
import { Aside } from "../components/Aside";
import imgAdd1 from "../../assets/add-1.png";
import { CardChart2 } from "../components/CardChart-2";
import { CardChart3 } from "../components/CardChart-3";
import { CardServicios } from "@/admin/components/CardServicios.tsx";
import { CardCreateServicio } from '@/admin/components/CardCreateServicio.tsx'
import { useServicio } from "@/hooks/useServicio"; // Importamos tu hook
import { useAuthContext } from "@/context/AuthContext"; // Para obtener el ID del usuario

export const ServiciosAdminDash = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuthContext();
    const { servicios, getByUserId, loading } = useServicio();

    // Cargar servicios reales
    useEffect(() => {
        if (user?.id) {
            getByUserId(Number(user.id));
        }
    }, [user?.id]);

    return (
        <div className="relative w-full h-screen flex flex-row">
            <Aside />
            
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                
                <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3">
                    <h1 className="text-[#393939] text-[20px] font-bold"> Tus Servicios Ofrecidos</h1>
                    
                    <div 
                        onClick={() => setIsModalOpen(true)}
                        className="flex flex-row items-center gap-1 rounded-[10px] bg-[#EB8369] p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:scale-105 transition-transform"
                    >
                        <img src={imgAdd1} alt="" className="w-[20px] h-[20px] object-cover" />
                        <span className="text-[#FFFFFF] text-[12px] font-bold">Publicar</span>
                    </div>
                </div>

                <div className="w-full h-[400px] flex flex-row items-center justify-start gap-5 mt-5 max-[890px]:flex-col max-[890px]:h-auto">
                    <div className="w-[60%] h-[400px] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[400px]">
                        
                        {/* Renderizado Dinámico */}
                        {loading ? (
                            <p className="text-center w-full mt-10">Cargando servicios...</p>
                        ) : servicios.length > 0 ? (
                            servicios.map((servicio) => (
                                <CardServicios key={servicio.id} servicio={servicio} />
                            ))
                        ) : (
                            <p className="text-center w-full mt-10 text-gray-500 text-sm">No has publicado servicios aún.</p>
                        )}

                    </div>
                    <CardChart2 />
                </div>

                <div className="w-full h-[400px] flex flex-row items-center justify-start gap-5 mt-5">
                    <CardChart3 />
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    {/* Al cerrar el modal podrías refrescar la lista volviendo a llamar a getByUserId */}
                    <CardCreateServicio onClose={() => {
                        setIsModalOpen(false);
                        if(user?.id) getByUserId(Number(user.id));
                    }} />
                </div>
            )}
        </div>
    );
};