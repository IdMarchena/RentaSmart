import imgAdd from "../../assets/add.png"
import imgHistory from "../../assets/history.png"

export const CardActivity = () => {
    return (
        <div className="w-full h-[70px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[20px] shadow-[0px_10px_10px_rgba(0,0,0,0.2)] p-2">
            <div className="w-[75%] flex flex-row items-start justify-start gap-2 mt-1">
                <img src={imgAdd} alt="add" className="w-[30px] h-[30px] object-cover"/>
                <div className="w-[70%] flex flex-col items-start justify-center  gap-1">
                    <h1 className="text-[#393939] text-[12px] font-bold">Publicación</h1>
                    <p className="text-[#393939] text-[8px] font-medium">Creaste una nueva publicación de apartamento o habitación.</p>
                </div>
            </div>
           
            <div className="w-[25%] flex flex-row items-start justify-start gap-1 flex-nowrap">
                <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover"/>
                <span className="text-[#393939] text-[8px] font-medium">20 ene 2024</span>

            </div>
            
        </div>
    )
}