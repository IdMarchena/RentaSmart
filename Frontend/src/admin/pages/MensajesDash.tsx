import { Aside } from "../components/Aside"
import { CardsChats } from "../components/CardsChats"

export const MensajesDash = () => {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3">
                    <h1 className="text-[#393939] text-[20px] font-bold"> Tus Mensajes</h1>
                </div>
                <div className="w-full h-[100vh] flex flex-row items-center justify-start gap-10 mt-5 max-[890px]:flex-col max-[890px]:h-[200vh]">
                    <div className="w-[50%] h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[100vh]">
                        <CardsChats />
                        <CardsChats />
                        <CardsChats />
                        <CardsChats />
                        <CardsChats />
                    </div>
                    <div className="w-[50%] h-[100vh] flex flex-col items-center justify-center gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-x-hidden p-5 max-[890px]:w-full">
                        <span className="text-[#393939] text-[12px] font-bold">Vista Previa del Chat</span>
                    </div>
                    

                </div>
            </div>
        </div>
    )
}