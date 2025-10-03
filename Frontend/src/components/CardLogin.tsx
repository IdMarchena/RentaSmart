import { CardRegister } from "./CardRegister.tsx";
import {useState} from "react";

interface CardLoginProps {
    onClose?: () => void;
}

export const CardLogin = ({ onClose }: CardLoginProps) => {
    const [OpenRegisterModal, setOpenRegisterModal] = useState(false);

    const toggleRegisterModal = () => {
        setOpenRegisterModal(!OpenRegisterModal);
    };
    return (
        <>
            <div className="relative w-[350px] h-[600px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden">

                <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#EB8369] rounded-full"></div>

                <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#EB8369] rounded-full"></div>

                {/* Botón de cerrar */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                    >
                        <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                    </button>
                )}

                <div className="w-full h-auto flex flex-col items-center justify-center gap-5 z-10">
                    <h1 className="text-[#393939] font-bold text-3xl">Inicia Sesión</h1>

                    <div className="flex flex-row items-center justify-center gap-2 z-10">
                        <span className=" text-[11px] text-[#393939] font-semibold">No tienes cuenta ? </span>
                        <p className="text-[11px] text-[#EB8369] font-bold cursor-pointer" onClick={toggleRegisterModal}>Crear</p>
                    </div>

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />

                    <button className="w-[60%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200">
                        <span className="font-semibold text-sm text-white">Ingresar</span>
                    </button>
                </div>
            </div>
            {/* Modal de Registro con Overlay */}
            {OpenRegisterModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay opaco */}
                    <div
                        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
                        onClick={toggleRegisterModal}
                    ></div>

                    {/* Card de Login */}
                    <div className="relative z-10">
                        <CardRegister onClose={toggleRegisterModal} />
                    </div>
                </div>
            )}
        </>

    );
};
