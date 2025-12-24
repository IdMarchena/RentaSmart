import imgUpload from "@/assets/upload.png"

interface CardCreatePubliProps {
    onClose?: () => void;
}

const CardCreateContratos = ({ onClose }: CardCreatePubliProps) => {
    return (
        <div className="relative md:w-[550px] h-[700px] w-[350px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden overflow-y-scroll custom-scrollbar-2">
            {/* Botón de cerrar */}
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <div className="w-full h-auto flex flex-col items-center justify-center gap-5 z-10 mt-10">
                <h1 className="text-[#393939] font-bold text-3xl">Crea tu Contrato</h1>
                <span className="text-[#393939] font-semibold text-sm">Completa todos los campos requeridos</span>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Que tipo de inmueble es?</label>
                    <select
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] placeholder-gray-400 focus:outline-none focus:border-[#EB8369]"
                    >
                        <option className="bg-[#FEFCEC] text-[#393939]">Apartamento</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">Casa</option>
                        <option className="bg-[#FEFCEC] text-[#393939]">Habitacion</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">C.C del arrendatario</label>
                    <input
                        type="number"
                        placeholder="Ej: 1082564890"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">C.C del arrendador</label>
                    <input
                        type="number"
                        placeholder="Ej: 1082564890"
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10 text-center">A continuación deberás adjuntar el contrato legal donde el arrendatario y arrendador firman y validad el cumplimiento, formato perimido .pdf</label>
                    <div className="w-full max-w-lg">
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-[#FEFCEC] hover:bg-gray-100 transition"
                        >
                            <img src={imgUpload} alt="img" className="w-10 h-10 text-gray-600 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">Carga Documento</p>
                            <input id="file-upload" type="file" className="hidden" />
                        </label>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-5">
                    <button className="w-[60%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200">
                        <span className="font-semibold text-sm text-white">Publicar Contrato</span>
                    </button>
                    <button className="w-[60%] h-[40px] rounded-[10px]  shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200">
                        <span className="font-semibold text-sm text-black">Cancelar</span>
                    </button>
                </div>

                
            </div>
        </div>
    )
}

export default CardCreateContratos