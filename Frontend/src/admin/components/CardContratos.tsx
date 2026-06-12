import { useState } from "react"
import imgHistory from "../../assets/history.png"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"
import imgFolder from "../../assets/folder.png"
import CardEditContrato from "./CardEditContrato"
import CardViewContrato from "./CardViewContrato"
import { CardConfirmation } from "./CardConfirmation"
import { useContrato } from "@/hooks/useContrato"
import type { Contrato } from "@/types/entitys"

interface CardContratosProps {
    contrato: Contrato // Usamos el tipo exacto que me pasaste
    onViewPDF: (pdfUrl: string | undefined) => void
    onDelete: () => void
}

export const CardContratos = ({ contrato, onViewPDF, onDelete }: CardContratosProps) => {
    const { remove } = useContrato() // Usamos 'remove' del hook que vimos antes
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    // Función para manejar cuando se genera un contrato
    const handleContractGenerated = (contractUrl: string) => {
        // Notificar al componente padre (ContratoDash) que hay una URL para mostrar
        onViewPDF(contractUrl);
    };

    // 1. Formatear fecha usando 'fechaInicio' de tu interfaz
    const fechaFormateada = contrato.fechaInicio 
        ? new Date(contrato.fechaInicio).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        : 'Sin fecha';

    // 2. Descripción usando el inmueble hidratado
    // Priorizamos la descripción del inmueble, si no, el contenido del contrato
    const descripcionCorta = contrato.inmueble?.descripcion 
        ? `${contrato.inmueble.tipo}: ${contrato.inmueble.descripcion}`
        : contrato.contenido?.substring(0, 80) || 'Sin descripción disponible';

    // 3. Mapeo de estados con emojis (usando las claves en MAYÚSCULAS de tu DTO/Entity)
    const estadoEmoji: Record<string, string> = {
        'PENDIENTE': '🟡',
        'ACTIVO': '🟢',
        'FINALIZADO': '⚪',
        'CANCELADO': '🔴',
        'SUSPENDIDO': '🟠'
    }

    const handleDelete = async () => {
        try {
            await remove(contrato.id)
            setShowConfirmationModal(false)
            onDelete() // Refrescar la lista en el padre
        } catch (err) {
            alert(`Error al eliminar: ${err}`)
        }
    }

    return (
        <>
            <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
                <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                    <div className="relative">
                        <img src={imgFolder} alt="folder" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2" />
                        {/* Usamos estadoContrato en mayúsculas */}
                        <span className="absolute -top-1 -right-1 text-xs">
                            {estadoEmoji[contrato.estadoContrato] || '📄'}
                        </span>
                    </div>
                    
                    <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                        <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold truncate w-full">
                            Contrato #{contrato.id} - {contrato.usuarioArrendatario?.nombre || 'Inquilino'}
                        </h1>
                        <p className="text-[#393939] md:text-[10px] text-[8px] font-medium line-clamp-2">
                            {descripcionCorta}
                        </p>
                        <span className="text-[#393939] text-[8px] font-bold capitalize">
                            Estado: <span className="font-normal">{contrato.estadoContrato}</span>
                        </span>
                    </div>
                </div>

                <div className="w-[30%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                        <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover" />
                        <span className="text-[#393939] text-[8px] font-medium">{fechaFormateada}</span>
                    </div>
                    
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                        {/* Botón Ver (Modal de detalle) */}
                        <img
                            src={imgVista}
                            alt="ver"
                            className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => setShowViewModal(true)}
                            title="Ver detalles"
                        />
                        {/* Botón Editar */}
                        <img
                            src={imgEditar}
                            alt="editar"
                            className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => setShowEditModal(true)}
                        />
                        {/* Botón Eliminar */}
                        <img
                            src={imgBorrar}
                            alt="borrar"
                            className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => setShowConfirmationModal(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Ver Detalle de Contrato */}
            {showViewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="absolute inset-0 backdrop-blur-sm" onClick={() => setShowViewModal(false)}></div>
                    <div className="relative z-10 w-full max-w-2xl">
                        <CardViewContrato 
                            contrato={contrato} 
                            onClose={() => setShowViewModal(false)} 
                            onContractGenerated={handleContractGenerated}
                        />
                    </div>
                </div>
            )}

            {/* Modal Editar Contrato */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="absolute inset-0 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
                    <div className="relative z-10 w-full max-w-2xl">
                        <CardEditContrato 
                            contrato={contrato} 
                            onClose={() => {
                                setShowEditModal(false)
                                onDelete() // Refrescar tras editar
                            }} 
                        />
                    </div>
                </div>
            )}

            {/* Modal Confirmación de Borrado */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="absolute inset-0 backdrop-blur-sm" onClick={() => setShowConfirmationModal(false)}></div>
                    <div className="relative z-10">
                        <CardConfirmation
                            onClose={() => setShowConfirmationModal(false)}
                            onConfirm={handleDelete}
                        />
                    </div>
                </div>
            )}
        </>
    )
}