import { Aside } from "../components/Aside"
import imgBannerAdmin from "../../assets/banner-admin.png"
import imgActivity from "../../assets/activity.png"
import { CardsData1 } from "../components/CardsData-1"
import { CardsData2 } from "../components/CardsData-2"
import { CardsData3 } from "../components/CardsData-3"
import { CardsData4 } from "../components/CardsData-4"
import { CardChart1 } from "../components/CardChart-1"
import { CardActivity } from "../components/CardActivity"
import { useActivity } from "../hooks/useActivity"
import { useAuthContext } from "../../context/AuthContext"


export const HomeDash = () => {
    const { user } = useAuthContext()
    const { activities, loading } = useActivity(user?.id)

    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                <div className="w-full h-[280px] flex flex-row items-center justify-between bg-[#393939] rounded-[10px] shadow-[0px_20px_10px_rgba(0,0,0,0.2)] mt-3">
                    <div className=" w-full md:w-[50%] flex flex-col items-start justify-center p-5">
                        <h1 className="text-[#FFFFFF] text-[25px] font-bold max-[708px]:text-[20px]">¡Bienvenido a tu panel de Renta<span className="text-[#EB8369] text-[25px] font-bold max-[708px]:text-[20px]">Smart</span>!</h1>
                        <br />
                        <p className="text-[#FFFFFF] text-[12px] font-medium max-[708px]:text-[10px]">Desde aquí puedes gestionar fácilmente todo lo relacionado con tus propiedades.</p>
                        <br />
                        <p className="text-[#FFFFFF] text-[12px] font-medium max-[708px]:text-[10px]">Crea nuevas publicaciones de apartamentos o habitaciones, edita o elimina las existentes, revisa tus contratos activos, y mantén el control total de tus arriendos.</p>
                    </div>
                    <img src={imgBannerAdmin} alt="Banner Admin" className=" hidden md:block w-[500px] h-[280px] object-cover rounded-[10px] max-[1082px]:w-[400px] max-[824px]:w-[300px] max-[610px]:w-[200px]" />
                </div>
                <div className="w-full h-auto flex flex-row items-center justify-start gap-5 p-2 flex-nowrap mt-10 max-[708px]:flex-col">
                    <CardsData1 />
                    <CardsData2 />
                    <CardsData3 />
                    <CardsData4 />
                </div>
                <h2 className="text-[#393939] text-[20px] font-bold mt-10">Detalles Generales</h2>
                <div className="w-full h-auto flex flex-row items-center justify-start gap-5 flex-nowrap mt-5 max-[908px]:flex-col">
                    <CardChart1 />
                    <div className="w-[40%] h-[400px] flex flex-col items-center justify-start bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] max-[908px]:w-full">
                        <div className="w-full h-auto flex flex-row items-center justify-between">
                            <div className="w-[70%] flex flex-col items-start justify-start p-6 gap-1">
                                <h1 className="text-[#393939] text-[14px] font-bold">Actividad Reciente</h1>
                                <p className="text-[#393939] text-[8px] font-medium">Tu historial de acciones en la plataforma.</p>
                            </div>
                            <img src={imgActivity} alt="Activity" className="w-[30px] h-[30px] object-cover mr-2" />
                        </div>
                        <div className="w-full h-[350px] flex flex-col items-center justify-start overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-2 gap-4">
                            {loading ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EB8369]"></div>
                                </div>
                            ) : activities.length === 0 ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-500 text-[12px] text-center">
                                        No hay actividad reciente
                                    </p>
                                </div>
                            ) : (
                                activities.map(activity => (
                                    <CardActivity key={activity.id} activity={activity} />
                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}