import imgCopy from "../../assets/Copy.png";
import type { Servicio } from '@/types/entitys'
import { useNavigate } from "react-router-dom";

interface CardSearchProps {
    servicio: Servicio;
}

export const CardSearchServicios = ({ servicio }: CardSearchProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/servicio/${servicio.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className="w-full min-h-[80px] flex flex-row items-center justify-between 
                       bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-3 
                       hover:bg-[#FEFCEC] transition-colors cursor-pointer"
        >
            <div className="w-full flex flex-row items-start justify-start gap-3">
                <img
                    src={imgCopy}
                    alt="service-icon"
                    className="w-[35px] h-[35px] object-cover rounded-full bg-[#BCBBB0] p-1 mt-1"
                />

                <div className="w-full flex flex-col items-start justify-center gap-1">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-[#393939] text-[13px] font-bold line-clamp-1">
                            {servicio.nombre}
                        </h1>
                        <span className="text-[#EB8369] font-bold text-[12px]">
                            ${servicio.precio.toLocaleString()}
                        </span>
                    </div>

                    <p className="text-[#393939] text-[10px] font-medium line-clamp-2 opacity-80">
                        {servicio.descripcion}
                    </p>

                    <div className="flex gap-2 items-center mt-1">
                        <span className="text-[8px] bg-[#BCBBB0] px-2 py-0.5 rounded-full text-white font-bold uppercase">
                            {servicio.tipo}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
