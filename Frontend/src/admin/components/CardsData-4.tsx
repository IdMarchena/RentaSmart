import imgChart2 from "../../assets/chart-2.png"

export const CardsData4 = () => {
    return (
        <div className="w-full h-[150px] flex flex-row items-center justify-between bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[30px]">
            <div className="w-[70%] flex flex-col items-start justify-center p-6 gap-1">
                <h1 className="text-[#393939] text-[15px] font-bold">Total de Mensajes</h1>
                <span className="text-[#393939] text-[30px] font-bold">3</span>
                <p className="text-[#393939] text-[9px] font-medium">Chats gestionados desde tu panel en tiempo real.</p>
            </div>
            <img src={imgChart2} alt="Banner Admin" className="w-[50px] h-[50px] object-cover mr-2" />
        </div>
    )
}