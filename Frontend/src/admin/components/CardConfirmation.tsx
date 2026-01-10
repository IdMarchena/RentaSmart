
interface CardConfirmationProps {
    onClose?: () => void
    onConfirm?: () => void
    message?: string
}

export const CardConfirmation = ({ onClose, onConfirm, message }: CardConfirmationProps) => {
    const handleConfirm = () => {
        onConfirm?.()
        onClose?.()
    }

    return (
        <div className=" relative w-[550px] h-[400px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden overflow-y-scroll custom-scrollbar-2">
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#EB8369] rounded-full"></div>

            <div className="absolute -bottom-6 -right-20 w-40 h-40 bg-[#EB8369] rounded-full"></div>

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
                <h1 className="text-[#393939] font-bold text-3xl">Confirmación para la acción a realizar</h1>
                <span className="text-[#393939] font-semibold text-sm text-center max-w-[80%]">
                    {message || (
                        <>
                            Estás a punto de <strong>eliminar este registro</strong>.
                            Esta acción es <span className="text-red-500">irreversible</span> y no podrás recuperarlo más adelante.
                            ¿Deseas continuar?
                        </>
                    )}
                </span>

                <div className="flex gap-3 w-full justify-center">
                    <button
                        onClick={onClose}
                        className="w-[30%] h-[40px] rounded-[10px] bg-gray-300 shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-gray-400 transition-colors duration-200"
                    >
                        <span className="font-semibold text-sm text-[#393939]">Cancelar</span>
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="w-[30%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200"
                    >
                        <span className="font-semibold text-sm text-white">Confirmar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
