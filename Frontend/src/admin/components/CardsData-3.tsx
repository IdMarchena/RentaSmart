import imgChart1 from "../../assets/chart-1.png"

export const CardsData3 = () => {
    return (
        <div className="w-full h-[150px] flex flex-row items-center justify-between bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[30px]">
            <div className="w-[70%] flex flex-col items-start justify-center p-6 gap-1 max-[1082px]:p-2">
                <h1 className="text-[#393939] text-[15px] font-bold max-[1082px]:text-[12px] max-[708px]:text-[13px]">Total de Servicios</h1>
                <span className="text-[#393939] text-[30px] font-bold max-[1082px]:text-[25px] max-[708px]:text-[20px]">0</span>
                <p className="text-[#393939] text-[9px] font-medium max-[1082px]:text-[8px] max-[708px]:text-[10px]">Servicios registrados en tus contratos actuales.</p>
            </div>
            <img src={imgChart1} alt="Banner Admin" className="w-[50px] h-[50px] object-cover mr-2 max-[1082px]:w-[40px] max-[1082px]:h-[40px]" />
        </div>
    )
}