import imgLogo from "../assets/Logo.png"
import { Link } from "react-router-dom"
import { CardLogin} from "../components/CardLogin.tsx";
import {useState} from "react";

export const Header = () => {
    const [OpenLoginModal, setOpenLoginModal] = useState(false);

    const toggleLoginModal = () => {
        setOpenLoginModal(!OpenLoginModal);
    };

    return (
        <>
            <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row justify-between p-5">
                <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row items-center ml-2">
                    <img src={imgLogo} alt="Logo" className="w-[37.33px] h-[50px]"/>
                    <h1 className="text-[#393939] text-[20px] font-semibold">Renta<span className="text-[#EB8369] text-[20px] font-semibold">Smart</span></h1>
                </div>
                <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row items-center gap-10 justify-end mr-3">
                    <Link to="/"><h1 className="text-[#393939] text-[18px] font-semibold">Inicio</h1></Link>
                    <Link to="/publications"><h1 className="text-[#393939] text-[18px] font-semibold">Publicaciones</h1></Link>
                    <button className="text-[#EB8369] text-[16px] font-semibold border-[1px] border-[#EB8369] rounded-[10px] w-[180px] h-[28px] cursor-pointer focus:bg-[#EB8369] focus:text-white" onClick={toggleLoginModal}>Iniciar Sesión</button>
                </div>
            </div>

            {/* Modal de Login con Overlay */}
            {OpenLoginModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay opaco */}
                    <div 
                        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
                        onClick={toggleLoginModal}
                    ></div>
                    
                    {/* Card de Login */}
                    <div className="relative z-10">
                        <CardLogin onClose={toggleLoginModal} />
                    </div>
                </div>
            )}
        </>
    )
}
