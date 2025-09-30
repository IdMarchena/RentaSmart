import imgHistory from "../../assets/history.png";
import imgCopy from "../../assets/Copy.png";
import imgVista from "../../assets/Vista.png";

 export const CardSearchServicios = () => {
    return (
        <div className="w-full h-[80px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
            <div className="w-[75%] flex flex-row items-start justify-start gap-2 ml-2">
                <img src={imgCopy} alt="add" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2"/>
                <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                    <h1 className="text-[#393939] text-[12px] font-bold">Servicio Reparacion</h1>
                    <p className="text-[#393939] text-[9px] font-medium">Descripcion</p>
                </div>
            </div>
            <div className="w-[25%] flex flex-col items-start justify-end gap-5 flex-nowrap mr-2 mt-1">
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                    <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover"/>
                    <span className="text-[#393939] text-[8px] font-medium">20 ene 2024</span>
                </div>
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                    <img src={imgVista} alt="history" className="w-[15px] h-[15px] object-cover"/>
                    <span className="text-[#393939] text-[8px] font-medium">Ver..</span>
                </div>
            </div>
        </div>
    );
};
