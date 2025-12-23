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
        <div className="w-auto h-full flex flex-col items-start justify-start border-r border-[#C7C6BA] gap-2 p-5 max-[1082px]:p-2">
            <div className="w-full h-[50px] bg-[#FEFCEC] md:flex flex-row items-center justify-center mb-2 p-2 max-[1082px]:justify-start">
                <img src={imgLogo} alt="Logo" className="w-[37.33px] h-[50px] object-cover"/>
                <h1 className="text-[#393939] xl:text-[20px] font-semibold max-[1082px]:hidden">Renta<span className="text-[#EB8369] xl:text-[20px] font-semibold max-[1082px]:hidden">Smart</span></h1>
            </div>
            <div className="w-full h-full flex flex-col items-start justify-center gap-5 p-2">
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <Link to="/admin"><img src={isHome ? imgHomeOn : imgHomeOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/></Link>
                    <Link to="/admin"><span className={isHome ? "text-[#EB8369] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden" : "text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden"}>Inicio</span></Link>
                    <div className={isHome ? " hidden md:block w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <Link to="/admin/publications"><img src={isPublications ? imgPubliOn : imgPubliOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/></Link>
                    <Link to="/admin/publications"><span className={isPublications ? "text-[#EB8369] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden" : "text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden"}>Publicaciones</span></Link>
                    <div className={isPublications ? " hidden md:block w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <Link to="/admin/contracts"><img src={isContracts ? imgContratosOn : imgContratosOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/></Link>
                    <Link to="/admin/contracts"><span className={isContracts ? "text-[#EB8369] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden" : "text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden"}>Contratos</span></Link>
                    <div className={isContracts ? " hidden md:block w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <Link to="/admin/messages"><img src={isMessages ? imgChatOn : imgChatOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/></Link>
                    <Link to="/admin/messages"><span className={isMessages ? "text-[#EB8369] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden" : "text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden"}>Mensajes</span></Link>
                    <div className={isMessages ? " hidden md:block w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <Link to="/admin/services"><img src={isServices ? imgServicioOn : imgServicioOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/></Link>
                    <Link to="/admin/services"><span className={isServices ? "text-[#EB8369] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden" : "text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden"}>Servicios</span></Link>
                    <div className={isServices ? " hidden md:block w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
            </div>

            <div className="w-full h-full flex flex-col items-start justify-end gap-5 p-2">
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <Link to="/admin/user"><img src={isUser ? imgUserOn : imgUserOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/></Link>
                    <Link to="/admin/user"><span className={isUser ? "text-[#EB8369] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden" : "text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden"}>Usuario</span></Link>
                    <div className={isUser ? " hidden md:block w-2 aspect-square rounded-full bg-[#EB8369]" : ""}></div>
                </div>
                <div className="md:flex flex-row items-center justify-between w-full max-[1082px]:justify-start max-[1082px]:gap-2">
                    <img src={imgExitOff} alt="Logo" className="w-[30px] h-[30px] object-cover"/>
                    <span className="text-[#A9ADB6] xl:text-[14px] text-[12px] font-semibold max-[1082px]:hidden">Salir</span>
                    <div className=""></div>
                </div>
            </div>
        </div>
    )
}