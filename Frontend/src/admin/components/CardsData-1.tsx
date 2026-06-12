import imgChart1 from "../../assets/chart-1.png";
import { usePublicaciones } from "../../hooks/usePublicaciones";
import { useAuthContext } from "../../context/AuthContext";
import type { Publicacion } from "@/types/entitys";

export const CardsData1 = () => {
    const { publications } = usePublicaciones();
    const { user } = useAuthContext();
    
    // Filtrar publicaciones del usuario actual
    const userPublicaciones = publications.filter((pub: Publicacion) => pub.usuario.id === Number(user?.id));
    console.log("Publicaciones del usuario:", userPublicaciones.length);
    
    return (
        <div className="w-full h-[150px] flex flex-row items-center justify-between bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[30px]">
            <div className="w-[70%] flex flex-col items-start justify-center p-6 gap-1 max-[1082px]:p-2">
                <h1 className="text-[#393939] text-[15px] font-bold max-[1082px]:text-[12px] max-[708px]:text-[13px]">Total de Publicaciones</h1>
                <span className="text-[#393939] text-[30px] font-bold max-[1082px]:text-[25px] max-[708px]:text-[20px]">{userPublicaciones.length}</span>
                <p className="text-[#393939] text-[9px] font-medium max-[1082px]:text-[8px] max-[708px]:text-[10px]">Estas son las publicaciones que tienes disponibles.</p>
            </div>
            <img src={imgChart1} alt="Banner Admin" className="w-[50px] h-[50px] object-cover mr-2 max-[1082px]:w-[40px] max-[1082px]:h-[40px]" />
        </div>
    );
};
