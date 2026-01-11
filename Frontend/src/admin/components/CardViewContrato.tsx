import imgDocument from "../../assets/document.png"

interface CardViewContratoProps {
    contrato: any
    onClose?: () => void
}

const CardViewContrato = ({ contrato, onClose }: CardViewContratoProps) => {
    const fechaInicio = new Date(contrato.fecha_inicio).toLocaleDateString('es-ES')
    const fechaFin = new Date(contrato.fecha_fin).toLocaleDateString('es-ES')

    const precioFormateado = contrato.precio_mensual?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    const depositoFormateado = contrato.deposito_seguridad?.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return (
        <div className="relative md:w-[650px] h-[700px] w-[350px] flex flex-col justify-start items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-y-scroll custom-scrollbar-2">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <div className="w-full h-auto flex flex-col items-center justify-start gap-4 z-10 mt-10">
                <h1 className="text-[#393939] font-bold text-2xl">Detalles del Contrato</h1>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${contrato.estado === 'activo' ? 'bg-green-200 text-green-800' :
                        contrato.estado === 'pendiente' ? 'bg-yellow-200 text-yellow-800' :
                            contrato.estado === 'finalizado' ? 'bg-gray-200 text-gray-800' :
                                'bg-red-200 text-red-800'
                    }`}>
                    Estado: {contrato.estado}
                </span>

                <div className="w-full grid grid-cols-2 gap-4 mt-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Publicación</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.publicacion?.titulo || `#${contrato.publicacion_id}`}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Inmueble</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.inmueble?.direccion || `#${contrato.inmueble_id}`}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Arrendador</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.arrendador?.nombre || 'No disponible'}
                        </p>
                        <p className="text-xs text-gray-500">{contrato.arrendador?.correo}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Arrendatario</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.arrendatario?.nombre || 'No disponible'}
                        </p>
                        <p className="text-xs text-gray-500">{contrato.arrendatario?.correo}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Fecha Inicio</label>
                        <p className="text-sm font-semibold text-[#393939]">{fechaInicio}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Fecha Fin</label>
                        <p className="text-sm font-semibold text-[#393939]">{fechaFin}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Precio Mensual</label>
                        <p className="text-sm font-bold text-green-700">{precioFormateado}</p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Depósito</label>
                        <p className="text-sm font-semibold text-[#393939]">{depositoFormateado}</p>
                    </div>

                    <div className="flex flex-col col-span-2">
                        <label className="text-xs font-bold text-gray-600 mb-1">Día de Pago</label>
                        <p className="text-sm font-semibold text-[#393939]">Día {contrato.dia_pago} de cada mes</p>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-2 mt-4">
                    <label className="text-xs font-bold text-gray-600">Términos y Condiciones</label>
                    <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                        <p className="text-xs text-gray-700">{contrato.terminos_condiciones}</p>
                    </div>
                </div>

                {contrato.clausulas_especiales && (
                    <div className="w-full flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-600">Cláusulas Especiales</label>
                        <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-700">{contrato.clausulas_especiales}</p>
                        </div>
                    </div>
                )}

                {contrato.documento_url && (
                    <div className="flex flex-col w-full">
                        <label className="text-sm font-bold text-[#393939] mb-2">Documento Adjunto</label>
                        <div className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <img src={imgDocument} alt="document" className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-semibold text-[#393939]">Contrato.pdf</span>
                            </div>
                            <a
                                href={contrato.documento_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-[#EB8369] text-white text-xs font-bold rounded-lg hover:bg-[#d67359] transition"
                            >
                                Ver PDF
                            </a>
                        </div>
                    </div>
                )}

                <div className="w-full flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="w-[60%] h-[40px] rounded-[10px] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                    >
                        <span className="font-semibold text-sm text-black">Cerrar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardViewContrato
