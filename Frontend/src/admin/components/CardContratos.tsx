import { useState } from "react"
import imgHistory from "../../assets/history.png"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"
import imgFolder from "../../assets/folder.png"
import CardEditContrato from "./CardEditContrato"
import CardViewContrato from "./CardViewContrato"
import { CardConfirmation } from "./CardConfirmation"
import { useContratos } from "../hooks/useContratos"

interface CardContratosProps {
    contrato: any
    onViewPDF: (pdfUrl: string | undefined) => void
    onDelete: () => void
}

export const CardContratos = ({ contrato, onViewPDF, onDelete }: CardContratosProps) => {
    const { deleteContrato } = useContratos()
    const [showViewModal, setShowViewModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    // Formatear fecha
    const fechaFormateada = new Date(contrato.created_at).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    })

    // Descripción del contrato
    const descripcion = contrato.inmueble
        ? `Contrato de ${contrato.inmueble.direccion}, ${contrato.inmueble.ciudad}`
        : contrato.terminos_condiciones?.substring(0, 100) || 'Contrato de arrendamiento'

    // Estados con emojis
    const estadoEmoji: Record<string, string> = {
        pendiente: '🟡',
        activo: '🟢',
        finalizado: '⚪',
        cancelado: '🔴'
    }

    const handleDelete = async () => {
        const result = await deleteContrato(contrato.id)
        if (result.success) {
            setShowConfirmationModal(false)
            onDelete()
        } else {
            alert(`Error al eliminar: ${result.error}`)
        }
    }

    return (
        <>
            <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
                <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                    <div className="relative">
                        <img src={imgFolder} alt="add" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2" />
                        <span className="absolute -top-1 -right-1 text-xs">{estadoEmoji[contrato.estado]}</span>
                    </div>
                    <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                        <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold">
                            Contrato #{contrato.id} - {contrato.publicacion?.titulo || 'Sin título'}
                        </h1>
                        <p className="text-[#393939] md:text-[10px] text-[8px] font-medium line-clamp-2">
                            {descripcion}
                        </p>
                        <span className="text-[#393939] text-[8px] font-bold capitalize">
                            Estado: {contrato.estado}
                        </span>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                        <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover" />
                        <span className="text-[#393939] text-[8px] font-medium">{fechaFormateada}</span>
                    </div>
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                        <img
                            src={imgVista}
                            alt="vista"
                            className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => {
                                if (contrato.documento_url) {
                                    onViewPDF(contrato.documento_url)
                                } else {
                                    alert('Este contrato no tiene PDF adjunto')
                                }
                            }}
                            title={contrato.documento_url ? "Ver PDF" : "Sin PDF"}
                        />
                        <img
                            src={imgEditar}
                            alt="editar"
                            className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor pointer hover:opacity-70 transition-opacity"
                            onClick={() => setShowEditModal(true)}
                        />
                        <img
                            src={imgBorrar}
                            alt="borrar"
                            className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer hover:opacity-70 transition-opacity"
                            onClick={() => setShowConfirmationModal(true)}
                        />
                    </div>
                </div>
            </div>

            {/* Modal Ver Contrato */}
            {showViewModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setShowViewModal(false)}
                    ></div>
                    <div className="relative z-10">
                        <CardViewContrato contrato={contrato} onClose={() => setShowViewModal(false)} />
                    </div>
                </div>
            )}

            {/* Modal Editar Contrato */}
            {showEditModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setShowEditModal(false)}
                    ></div>
                    <div className="relative z-10">
                        <CardEditContrato contrato={contrato} onClose={() => {
                            setShowEditModal(false)
                            onDelete()
                        }} />
                    </div>
                </div>
            )}

            {/* Modal Confirmación */}
            {showConfirmationModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="absolute inset-0 bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setShowConfirmationModal(false)}
                    ></div>
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