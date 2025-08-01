import { Aside } from "../components/Aside"
import imgAdd1 from "../../assets/add-1.png"
import { CardChart2 } from "../components/CardChart-2"
import { CardChart3 } from "../components/CardChart-3"
import { CardsPubli } from "../components/CardsPubli"

export const PublicationDash = () => {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3">
                    <h1 className="text-[#393939] text-[20px] font-bold"> Tus Publicaciones</h1>
                    <div className="flex flex-row items-center gap-1 rounded-[10px] bg-[#EB8369] p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.2)]">
                        <img src={imgAdd1} alt="" className="w-[20px] h-[20px] object-cover" />
                        <span className="text-[#FFFFFF] text-[12px] font-bold">Publicar</span>
                    </div>
                </div>
                <div className="w-full h-[400px] flex flex-row items-center justify-start gap-5 mt-5 max-[890px]:flex-col max-[890px]:h-auto">
                    <div className="w-[60%] h-[400px] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[400px]">
                        <CardsPubli />
                        <CardsPubli />
                        <CardsPubli />
                        <CardsPubli />
                        <CardsPubli />
                        
                    </div>
                    <CardChart2 />
                </div>
                <div className="w-full h-[400px] flex flex-row items-center justify-start gap-5 mt-5">
                    <CardChart3 />
                </div>
                
            </div>
        </div>
    )
}