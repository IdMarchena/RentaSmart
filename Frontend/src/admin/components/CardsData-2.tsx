import imgChart2 from "../../assets/chart-2.png"
import { useContratos } from "../hooks/useContratos"

export const CardsData2 = () => {
    const { contratos } = useContratos();
    return (
        <div className="w-full h-[150px] flex flex-row items-center justify-between bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[30px]">
            <div className="w-[70%] flex flex-col items-start justify-center p-6 gap-1 max-[1082px]:p-2">
                <h1 className="text-[#393939] text-[15px] font-bold max-[1082px]:text-[12px] max-[708px]:text-[13px]">Total de Contratos</h1>
                <span className="text-[#393939] text-[30px] font-bold max-[1082px]:text-[25px] max-[708px]:text-[20px]">{contratos.length}</span>
                <p className="text-[#393939] text-[9px] font-medium max-[1082px]:text-[8px] max-[708px]:text-[10px]">Estos son los contratos que tienes activos.</p>
            </div>
            <img src={imgChart2} alt="Banner Admin" className="w-[50px] h-[50px] object-cover mr-2 max-[1082px]:w-[40px] max-[1082px]:h-[40px]" />
        </div>
    )
}

