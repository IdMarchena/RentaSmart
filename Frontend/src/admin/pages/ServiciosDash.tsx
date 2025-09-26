
import { Aside } from "../components/Aside"
import imgUserAdmin from "../../assets/admin.png"
import {CardServicios} from "@/admin/components/CardServicios.tsx";
import imgSearch from "../../assets/search.png"
import {CardSearchServicios} from "@/admin/components/CardSearchServicios.tsx";
import {Link} from "react-router-dom";
export const ServiciosDash = () => {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3 cursor-pointer">
                    <h1 className="text-[#393939] text-[20px] font-bold"> Tus Servicios</h1>
                    <div className=" h-[35px] flex flex-row items-center justify-center gap-1 rounded-[10px] bg-[#EB8369] p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.2)]">
                        <img src={imgUserAdmin} alt="" className="w-[20px] h-[20px] object-cover" />
                        <Link to="/admin/servicesAdmin"><span className="text-[#FFFFFF] text-[12px] font-bold">Profesional</span></Link>
                    </div>
                </div>
                <div className="w-full h-[100vh] flex flex-row items-center justify-start gap-10 mt-5 max-[890px]:flex-col max-[890px]:h-[200vh]">
                    <div className="w-[50%] h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[100vh]">
                        <CardServicios/>
                        <CardServicios/>
                        <CardServicios/>
                        <CardServicios/>
                        <CardServicios/>
                        <CardServicios/>
                        <CardServicios/>
                    </div>
                    <div className="w-[50%] h-[100vh] flex flex-col items-center justify-center gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-x-hidden p-5 max-[890px]:w-full">
                        <div className="w-full h-auto flex flex-row items-center justify-between gap-2">
                            <h1 className="text-[#393939] font-bold text-[15px]">Encontrar Servicios</h1>
                            <div className=" w-[60%] flex flex-row items-center gap-1 bg-[#FEFCEC] border-[#BCBBB0] rounded-[20px]">
                                <img src={imgSearch} alt="" className="w-[20px] h-[20px] object-cover" />
                                <input
                                    type="text"
                                    placeholder="Que Servicio Necesitas?"
                                    className="bg-[#FEFCEC] text-sm font-bold w-full rounded-[20px] "
                                />
                            </div>
                        </div>
                        <div className="w-full h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[100vh]">
                            <CardSearchServicios/>
                            <CardSearchServicios/>
                            <CardSearchServicios/>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}