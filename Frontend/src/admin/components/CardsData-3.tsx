import imgChart1 from "../../assets/chart-1.png"

export const CardsData3 = () => {
    return (
        <div className="w-full h-[150px] flex flex-row items-center justify-between bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[30px]">
            <div className="w-[70%] flex flex-col items-start justify-center p-6 gap-1">
                <h1 className="text-[#393939] text-[15px] font-bold">Total de Servicios</h1>
                <span className="text-[#393939] text-[30px] font-bold">19</span>
                <p className="text-[#393939] text-[9px] font-medium">Servicios registrados en tus contratos actuales.</p>
            </div>
            <img src={imgChart1} alt="Banner Admin" className="w-[50px] h-[50px] object-cover mr-2" />
        </div>
    )
}