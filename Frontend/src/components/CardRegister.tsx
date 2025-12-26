

interface CardRegisterProps {
    onClose?: () => void;
}

export const CardRegister = ({ onClose }: CardRegisterProps) => {
    return (
        <div className="relative w-[350px] h-[650px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden">

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
                <h1 className="text-[#393939] font-bold text-3xl">Registrate</h1>

                <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <input
                    type="number"
                    placeholder="Cedula"
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <input
                    type="number"
                    placeholder="Telefono"
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Rol de tu perfil</label>
                    <select
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] placeholder-gray-400 focus:outline-none focus:border-[#EB8369]"
                    >
                        <option className="bg-[#FEFCEC] text-[#393939]">Arrendador</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">Arrendatario</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">Tecnico</option>
                    </select>
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
                    <span className="font-semibold text-sm text-white">Registrar</span>
                </button>
            </div>
        </div>
    );
};
