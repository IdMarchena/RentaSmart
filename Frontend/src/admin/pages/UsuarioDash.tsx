import imgUser from "../../assets/user.png"
import { Aside } from "../components/Aside"

export const UsuarioDash = () => {
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-center justify-center">
                <div className=" w-[50%] max-[890px]:w-[80%] h-[600px] flex flex-col items-center justify-start gap-5 border-[1px] border-[#EFEDDE] rounded-[10px] p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.2)]">
                    <div className=" w-full h-auto flex flex-row items-start justify-center gap-2 mt-10">
                        <img src={imgUser} alt="" className="w-[40px] h-[40px] object-cover" />
                        <h1 className="text-[#393939] font-bold text-2xl">Sara Castro</h1>

                    </div>
                    <div className=" w-full flex flex-col items-center justify-center gap-2 p-5 overflow-y-scroll custom-scrollbar-2">
                        <div className=" w-full flex flex-col items-center justify-center gap-2">
                            <span className="text-[#393939] text-[12px] font-bold">Nombre</span>
                            <input
                                type="text"
                                placeholder="Sara Castro"
                                className=" w-full h-[30px] bg-[#FEFCEC] text-sm font-bold rounded-[10px] border-[1px] border-[#BCBBB0] text-[#A9ADB6] p-1"
                            />
                        </div>
                        <div className=" w-full flex flex-col items-center justify-center gap-2">
                            <span className="text-[#393939] text-[12px] font-bold">Cedula</span>
                            <input
                                type="number"
                                placeholder="1082532795"
                                className=" w-full h-[30px] bg-[#FEFCEC] text-sm font-bold rounded-[10px] border-[1px] border-[#BCBBB0] text-[#A9ADB6] p-1"
                            />
                        </div>
                        <div className=" w-full flex flex-col items-center justify-center gap-2">
                            <span className="text-[#393939] text-[12px] font-bold">Telefono</span>
                            <input
                                type="number"
                                placeholder="3004217623"
                                className=" w-full h-[30px] bg-[#FEFCEC] text-sm font-bold rounded-[10px] border-[1px] border-[#BCBBB0] text-[#A9ADB6] p-1"
                            />
                        </div>
                        <div className=" w-full flex flex-col items-center justify-center gap-2">
                            <span className="text-[#393939] text-[12px] font-bold">Rol</span>
                            <input
                                type="text"
                                placeholder="Arrendador"
                                className=" w-full h-[30px] bg-[#FEFCEC] text-sm font-bold rounded-[10px] border-[1px] border-[#BCBBB0] text-[#A9ADB6] p-1"
                            />
                        </div>
                        <div className=" w-full flex flex-col items-center justify-center gap-2">
                            <span className="text-[#393939] text-[12px] font-bold">Correo</span>
                            <input
                                type="email"
                                placeholder="saracastro@gmail.com"
                                className=" w-full h-[30px] bg-[#FEFCEC] text-sm font-bold rounded-[10px] border-[1px] border-[#BCBBB0] text-[#A9ADB6] p-1"
                            />
                        </div>
                        <div className=" w-full flex flex-col items-center justify-center gap-2">
                            <span className="text-[#393939] text-[12px] font-bold">Contraseña</span>
                            <input
                                type="password"
                                placeholder="..................."
                                className=" w-full h-[30px] bg-[#FEFCEC] text-sm font-bold rounded-[10px] border-[1px] border-[#BCBBB0] text-[#A9ADB6] p-1"
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center gap-2">
                        <button className="w-[50%] h-[30px] rounded-[10px] border-[1px] border-[#BCBBB0] text-center cursor-pointer ">
                            <span className="font-semibold text-sm text-[#393939]">Cancelar</span>
                        </button>
                        <button className="w-[50%] h-[35px] rounded-[10px] border-[1px] border-[#BCBBB0] text-center bg-[#EB8369] shadow-[0px_10px_10px_rgba(0,0,0,0.2)]  cursor-pointer ">
                            <span className="font-semibold text-sm text-[#393939]">Confirmar</span>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}