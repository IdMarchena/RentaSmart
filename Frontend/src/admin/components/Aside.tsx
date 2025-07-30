import imgLogo from "../../assets/Logo.png"
import imgHomeOn from "../../assets/home-on.png"
import imgHomeOff from "../../assets/home-off.png"
import imgUserOn from "../../assets/user-on.png"
import imgUserOff from "../../assets/user-off.png"
import imgPubliOn from "../../assets/publi-on.png"
import imgPubliOff from "../../assets/publi-off.png"
import imgContratosOn from "../../assets/contratos-on.png"
import imgContratosOff from "../../assets/contratos-off.png"
import imgChatOn from "../../assets/chat-on.png"
import imgChatOff from "../../assets/chat-off.png"
import imgExitOff from "../../assets/exit-off.png"
import imgServicioOn from "../../assets/servicios-on.png"
import imgServicioOff from "../../assets/servicios-off.png"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"

export const Aside = () => {
    const location = useLocation();
    const isHome = location.pathname === '/admin';
    const isPublications = location.pathname === '/admin/publications';
    const isContracts = location.pathname === '/admin/contracts';
    const isMessages = location.pathname === '/admin/messages';
    const isServices = location.pathname === '/admin/services';
    const isUser = location.pathname === '/admin/user';


    return (
        <div className="w-[15%] h-full flex flex-col items-start justify-start border-r border-[#C7C6BA] gap-2 p-5">
            <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row items-center mb-2 p-2">
                <img src={imgLogo} alt="Logo" className="w-[37.33px] h-[50px]"/>
                <h1 className="text-[#393939] text-[20px] font-semibold">Renta<span className="text-[#EB8369] text-[20px] font-semibold">Smart</span></h1>
            </div>
            <div className="w-full h-full flex flex-col items-start justify-center gap-5 p-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={isHome ? imgHomeOn : imgHomeOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <Link to="/admin"><span className={isHome ? "text-[#EB8369] text-[14px] font-semibold" : "text-[#A9ADB6] text-[14px] font-semibold"}>Inicio</span></Link>
                    <div className={isHome ? "w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={isPublications ? imgPubliOn : imgPubliOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <Link to="/admin/publications"><span className={isPublications ? "text-[#EB8369] text-[14px] font-semibold" : "text-[#A9ADB6] text-[14px] font-semibold"}>Publicaciones</span></Link>
                    <div className={isPublications ? "w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={isContracts ? imgContratosOn : imgContratosOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <Link to="/admin/contracts"><span className={isContracts ? "text-[#EB8369] text-[14px] font-semibold" : "text-[#A9ADB6] text-[14px] font-semibold"}>Contratos</span></Link>
                    <div className={isContracts ? "w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={isMessages ? imgChatOn : imgChatOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <Link to="/admin/messages"><span className={isMessages ? "text-[#EB8369] text-[14px] font-semibold" : "text-[#A9ADB6] text-[14px] font-semibold"}>Mensajes</span></Link>
                    <div className={isMessages ? "w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={isServices ? imgServicioOn : imgServicioOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <Link to="/admin/services"><span className={isServices ? "text-[#EB8369] text-[14px] font-semibold" : "text-[#A9ADB6] text-[14px] font-semibold"}>Servicios</span></Link>
                    <div className={isServices ? "w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
            </div>

            <div className="w-full h-full flex flex-col items-start justify-end gap-5 p-2">
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={isUser ? imgUserOn : imgUserOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <Link to="/admin/user"><span className={isUser ? "text-[#EB8369] text-[14px] font-semibold" : "text-[#A9ADB6] text-[14px] font-semibold"}>Usuario</span></Link>
                    <div className={isUser ? "w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <img src={imgExitOff} alt="Logo" className="w-[30px] h-[30px]"/>
                    <span className="text-[#A9ADB6] text-[14px] font-semibold">Salir</span>
                    <div className=""></div>
                </div>
            </div>
        </div>
    )
}