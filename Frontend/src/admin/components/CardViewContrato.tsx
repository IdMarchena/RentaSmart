import imgDocument from "../../assets/document.png"
import imgTrash from "../../assets/trash.png"
import imgVista from "../../assets/vista.png"

interface CardViewContratoProps {
    onClose?: () => void;
}

const CardViewContrato = ({ onClose }: CardViewContratoProps) => {
    return (
        <div className="relative md:w-[550px] h-[650px] w-[350px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden overflow-y-scroll custom-scrollbar-2">
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
                <h1 className="text-[#393939] font-bold text-3xl">Tu Contrato</h1>
                <span className="text-[#393939] font-semibold text-sm">Completa todos los campos requeridos</span>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Que tipo de inmueble se arrienda?</label>
                    <select
                        disabled
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-gray-100 text-[#393939] placeholder-gray-400 cursor-not-allowed"
                    >
                        <option className="bg-[#FEFCEC] text-[#393939]">Selecciona un tipo</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">C.C del arrendatario</label>
                    <input
                        type="text"
                        placeholder="Ej: 1082564890"
                        disabled
                        className="w-full h-[40px] bg-gray-100 text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 cursor-not-allowed"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">C.C del arrendador</label>
                    <input
                        type="text"
                        placeholder="Ej: 1082564890"
                        disabled
                        className="w-full h-[40px] bg-gray-100 text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 cursor-not-allowed"
                    />
                </div>

                {/* Sección de archivos adjuntos */}
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-2 z-10 text-center">Archivos Adjuntos .pdf</label>
                    <div className="w-full max-w-lg border-2 border-dashed border-gray-400 rounded-lg p-4 bg-[#FEFCEC]">
                        {/* Documento adjunto */}
                        <div className="flex flex-row items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm">
                            <div className="flex flex-row items-center gap-3">
                                <div className="w-10 h-10  bg-opacity-20 rounded-lg flex items-center justify-center">
                                    <img src={imgDocument} alt="document" className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-semibold text-[#393939]">DocumentoRenta.pdf</span>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                                <button className="w-8 h-8 border-gray-300 rounded-lg flex items-center justify-center hover:bg-[#d67359] transition-colors">
                                    <img src={imgVista} alt="vista" className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors">
                                    <img src={imgTrash} alt="delete" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-5 mt-4">
                    <button
                        onClick={onClose}
                        className="w-[60%] h-[40px] rounded-[10px] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                    >
                        <span className="font-semibold text-sm text-black">Cancelar</span>
                    </button>
                    <button className="w-[60%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200">
                        <span className="font-semibold text-sm text-white">Crear</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardViewContrato
