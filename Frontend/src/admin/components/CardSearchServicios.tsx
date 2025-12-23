import imgCopy from "../../assets/Copy.png";

 export const CardSearchServicios = () => {
    return (
        <div className="w-full h-[80px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
            <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                <img src={imgCopy} alt="add" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2"/>
                <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                    <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold">Servicio Reparacion</h1>
                    <p className="text-[#393939] md:text-[10px] text-[8px] font-medium">Descripcion</p>
                </div>
            </div>
        </div>
    );
};
