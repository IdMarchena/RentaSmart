import imgLogo from "../assets/Logo.png"
import { Link } from "react-router-dom"
import { CardLogin } from "../components/CardLogin.tsx";
import { useAuthModal } from "../context/AuthModalContext";
import { useAuthContext } from "../context/AuthContext";

export const Header = () => {
    const { isAuthenticated } = useAuthContext();
    const { openLoginModal, closeModal, isOpenLogin } = useAuthModal();  
 

    return (
        <>
            <div className="w-full h-[50px] bg-[#FEFCEC] flex flex-row justify-between items-center px-3 md:px-5 mt-5">
                <div className="flex flex-row items-center gap-2">
                    <img src={imgLogo} alt="Logo" className="w-[30px] h-[40px] md:w-[37.33px] md:h-[50px]" />
                    <h1 className="text-[#393939] text-[15px] md:text-[20px] font-semibold">Renta<span className="text-[#EB8369] text-[15px] md:text-[20px] font-semibold">Smart</span></h1>
                </div>
                <div className="flex flex-row items-center gap-2 md:gap-10">
                    <Link to="/"><h1 className="text-[#393939] text-[15px] md:text-[18px] font-semibold">Inicio</h1></Link>
                    <Link to="/publications"><h1 className="text-[#393939] text-[15px] md:text-[18px] font-semibold">Publicaciones</h1></Link>
                    {isAuthenticated ? (
                        <button className="text-[#EB8369] text-[11px] md:text-[16px] font-semibold border-[1px] border-[#EB8369] rounded-[10px] w-[80px] md:w-[150px] h-[28px] cursor-pointer focus:bg-[#EB8369] focus:text-white">Admin</button>
                    ) : (
                        <button className="text-[#EB8369] text-[11px] md:text-[16px] font-semibold border-[1px] border-[#EB8369] rounded-[10px] w-[80px] md:w-[150px] h-[28px] cursor-pointer focus:bg-[#EB8369] focus:text-white" onClick={ ()  => openLoginModal()}>Iniciar Sesión</button>
                    )}
                </div>
            </div>

            {/* Modal de Login con Overlay */}
            {isOpenLogin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay opaco */}
                    <div
                        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
                        onClick={closeModal}
                    ></div>

                    {/* Card de Login */}
                    <div className="relative z-10">
                        <CardLogin onClose={closeModal} />
                    </div>
                </div>
            )}
        </>
    )
}
