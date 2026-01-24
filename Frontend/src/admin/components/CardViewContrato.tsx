import imgDocument from "../../assets/document.png"
import type { Contrato } from "@/types/entitys"
import { generateLegalContractTemplate } from "@/utils/contractGenerator"
import { generateContractPDF, downloadContractAsText, generateContractPreview } from "@/utils/pdfGenerator"

interface CardViewContratoProps {
    contrato: Contrato // Usamos el tipo real
    onClose?: () => void
    onContractGenerated?: (contractUrl: string) => void // Nuevo prop para notificar cuando se genera el contrato
}

const CardViewContrato = ({ contrato, onClose, onContractGenerated }: CardViewContratoProps) => {
    // 1. Corregimos nombres de fechas
    const fechaInicio = contrato.fechaInicio ? new Date(contrato.fechaInicio).toLocaleDateString('es-ES') : 'No definida'
    const fechaFin = contrato.fechaFinalizacion ? new Date(contrato.fechaFinalizacion).toLocaleDateString('es-ES') : 'No definida'

    // Función para generar y descargar el contrato PDF
    const handleGeneratePDF = () => {
        try {
            const contractContent = generateLegalContractTemplate(contrato);
            const fileName = `contrato-arrendamiento-${contrato.id}-${new Date().toISOString().split('T')[0]}.pdf`;
            generateContractPDF(contractContent, fileName);
        } catch (error) {
            console.error('Error generando PDF:', error);
            alert('Error al generar el PDF. Por favor, intenta nuevamente.');
        }
    };

    // Función para generar vista previa y notificar al padre
    const handleGeneratePreview = () => {
        try {
            const contractContent = generateLegalContractTemplate(contrato);
            const contractUrl = generateContractPreview(contractContent);
            
            // Notificar al componente padre que se generó el contrato
            if (onContractGenerated) {
                onContractGenerated(contractUrl);
            }
            
            // Cerrar el modal actual
            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error('Error generando vista previa:', error);
            alert('Error al generar la vista previa. Por favor, intenta nuevamente.');
        }
    };

    // Función para descargar como texto
    const handleDownloadText = () => {
        try {
            const contractContent = generateLegalContractTemplate(contrato);
            const fileName = `contrato-arrendamiento-${contrato.id}-${new Date().toISOString().split('T')[0]}.txt`;
            downloadContractAsText(contractContent, fileName);
        } catch (error) {
            console.error('Error descargando texto:', error);
            alert('Error al descargar el contrato. Por favor, intenta nuevamente.');
        }
    };

    // 2. Corregimos nombre de variable de precio
    const precioFormateado = (contrato.precio || 0).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    // 3. Corregimos nombre de variable de depósito
    const depositoFormateado = (contrato.deposito || 0).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return (
        <div className="relative md:w-[650px] max-h-[90vh] w-[350px] flex flex-col justify-start items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-y-auto custom-scrollbar-2">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#393939] text-xl font-bold">×</span>
                </button>
            )}

            <div className="w-full h-auto flex flex-col items-center justify-start gap-4 z-10 mt-6">
                <h1 className="text-[#393939] font-bold text-2xl">Detalles del Contrato</h1>
                
                {/* Badge de Estado corregido */}
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    contrato.estadoContrato === 'ACTIVO' ? 'bg-green-200 text-green-800' :
                    contrato.estadoContrato === 'PENDIENTE' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-gray-200 text-gray-800'
                }`}>
                    Estado: {contrato.estadoContrato}
                </span>

                <div className="w-full grid grid-cols-2 gap-4 mt-4 text-left">
                    {/* Inmueble hidratado */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Inmueble</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.inmueble?.tipo} - {contrato.inmueble?.ubicacion?.nombre || `ID: ${contrato.inmueble?.id}`}
                        </p>
                    </div>

{/* Sección de Ubicación en el JSX */}
<div className="flex flex-col">
    <label className="text-xs font-bold text-gray-600 mb-1">Ciudad/Ubicación</label>
    <p className="text-sm font-semibold text-[#393939]">
        {
            // Intentamos varias rutas por si el mapeo varía
            (contrato.inmueble as any).ubicacion?.nombre || 
            (contrato.inmueble as any).idUbicacion?.nombre || 
            "Ubicación no cargada"
        }
    </p>
</div>

                    {/* Usuarios hidratados */}
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Arrendador</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.usuarioArrendador?.nombre || 'No disponible'}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-600 mb-1">Arrendatario</label>
                        <p className="text-sm font-semibold text-[#393939]">
                            {contrato.usuarioArrendatario?.nombre || 'No disponible'}
                        </p>
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
                        <p className="text-sm font-semibold text-[#393939]">Día {contrato.diaDePago} de cada mes</p>
                    </div>
                </div>

                {/* Contenido/Términos */}
                <div className="w-full flex flex-col gap-2 mt-4 text-left">
                    <label className="text-xs font-bold text-gray-600">Contenido del Contrato</label>
                    <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 max-h-32 overflow-y-auto">
                        <p className="text-xs text-gray-700 whitespace-pre-wrap">{contrato.contenido}</p>
                    </div>
                </div>

                {/* Cláusulas Especiales */}
                {contrato.clausulasEspeciales && (
                    <div className="w-full flex flex-col gap-2 text-left">
                        <label className="text-xs font-bold text-gray-600">Cláusulas Especiales</label>
                        <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-700">{contrato.clausulasEspeciales}</p>
                        </div>
                    </div>
                )}

                {/* Financiación (Si existe) */}
                {contrato.financiacion && (
                    <div className="w-full flex flex-col gap-2 text-left bg-blue-50 p-3 rounded-lg border border-blue-100 mt-2">
                        <label className="text-xs font-bold text-blue-800 uppercase">Detalles de Financiación</label>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-[10px] text-blue-900">Cuotas: <strong>{contrato.financiacion.numeroCuotas}</strong></p>
                            <p className="text-[10px] text-blue-900">Interés: <strong>{contrato.financiacion.interes}%</strong></p>
                            <p className="text-[10px] text-blue-900">Valor Cuota: <strong>${contrato.financiacion.valorCuota?.toLocaleString()}</strong></p>
                        </div>
                    </div>
                )}

                {/* Sección de Descarga de Contrato */}
                <div className="w-full flex flex-col gap-2 mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <label className="text-xs font-bold text-blue-800 uppercase">Generar Contrato Legal</label>
                    <div className="w-full flex flex-row gap-2 justify-center">
                        <button
                            onClick={handleGeneratePreview}
                            className="flex-1 h-[40px] bg-[#EB8369] text-white rounded-[10px] shadow cursor-pointer hover:bg-[#d67359] transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <img src={imgDocument} alt="pdf" className="w-4 h-4" />
                            <span className="font-semibold text-xs">Generar Vista Previa</span>
                        </button>
                        <button
                            onClick={handleGeneratePDF}
                            className="flex-1 h-[40px] bg-[#393939] text-white rounded-[10px] shadow cursor-pointer hover:bg-black transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            <span className="font-semibold text-xs">Imprimir PDF</span>
                        </button>
                    </div>
                    <div className="w-full flex flex-row gap-2 justify-center mt-2">
                        <button
                            onClick={handleDownloadText}
                            className="flex-1 h-[35px] bg-gray-600 text-white rounded-[8px] shadow cursor-pointer hover:bg-gray-700 transition-colors duration-200"
                        >
                            <span className="font-semibold text-xs">Descargar TXT</span>
                        </button>
                    </div>
                    <p className="text-[10px] text-blue-600 text-center">
                        Documento listo para firma y validez legal
                    </p>
                </div>

                <div className="w-full flex justify-center mt-6">
                    <button
                        onClick={onClose}
                        className="w-[60%] h-[40px] bg-[#393939] text-white rounded-[10px] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-black transition-colors duration-200"
                    >
                        <span className="font-semibold text-sm">Cerrar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CardViewContrato