import imgHistory from "../../assets/history.png"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"
import { CardEditPubli } from "./CardEditPubli"
import { useState } from "react"
import { CardConfirmation } from "@/admin/components/CardConfirmation.tsx"
import { useNavigate } from "react-router-dom"
import { usePublications } from "@/hooks/usePublications"
import type { Publicacion, Inmueble } from "@/types/entities"

interface PublicacionCompleta extends Publicacion {
    inmueble?: Inmueble
    multimedia?: Array<{
        id: number
        url: string
        tipo: string
        es_portada: boolean
    }>
}

interface CardsPubliProps {
    publicacion: PublicacionCompleta
    onDelete?: () => void
}

export const CardsPubli = ({ publicacion, onDelete }: CardsPubliProps) => {
    const [OpenPublicModal, setOpenPublicModal] = useState(false)
    const [OpenConfirmationModal, setOpenConfirmationModal] = useState(false)
    const navigate = useNavigate()
    const { deletePublication } = usePublications()

    const togglePublicModal = () => {
        setOpenPublicModal(!OpenPublicModal)
    }

    const toggleConfirmationModal = () => {
        setOpenConfirmationModal(!OpenConfirmationModal)
    }

    const handleDelete = async () => {
        const result = await deletePublication(publicacion.id)
        if (result.success) {
            toggleConfirmationModal()
            onDelete?.()
        }
    }

    const handleView = () => {
        // Redirigir a la vista pública de la publicación
        navigate(`/publications/${publicacion.id}`)
    }

    const portadaUrl = publicacion.multimedia?.find(m => m.es_portada)?.url ||
        publicacion.multimedia?.[0]?.url ||
        imgVista

    const fecha = new Date(publicacion.created_at).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    // Truncar descripción
    const descripcionCorta = publicacion.descripcion.length > 120
        ? `${publicacion.descripcion.substring(0, 120)}...`
        : publicacion.descripcion

    return (
        <>
            <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
                <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                    <img
                        src={portadaUrl}
                        alt={publicacion.titulo}
                        className="hidden md:block w-[50%] h-[90px] object-cover rounded-[20px]"
                    />
                    <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                        <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold">
                            {publicacion.titulo|| 'Inmueble'}
                        </h1>
                        <p className="text-[#393939] md:text-[10px] text-[8px] font-medium">
                            {descripcionCorta}
                        </p>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                        <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover" />
                        <span className="text-[#393939] text-[8px] font-medium">{fecha}</span>
                    </div>
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                        <img
                            src={imgVista}
                            alt="vista"
                            className="md:w-[25px] md:h-[25px] w-[20px] h-[20px] object-cover cursor-pointer hover:opacity-70 transition"
                            onClick={handleView}
                            title="Ver publicación"
                        />
                        <img
                            src={imgEditar}
                            alt="editar"
                            className="md:w-[25px] md:h-[25px] w-[20px] h-[20px] object-cover cursor-pointer hover:opacity-70 transition"
                            onClick={togglePublicModal}
                            title="Editar publicación"
                        />
                        <img
                            src={imgBorrar}
                            alt="borrar"
                            className="md:w-[25px] md:h-[25px] w-[20px] h-[20px] object-cover cursor-pointer hover:opacity-70 transition"
                            onClick={toggleConfirmationModal}
                            title="Eliminar publicación"
                        />
                    </div>
                </div>
            </div>
            {OpenPublicModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay opaco */}
                    <div
                        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
                        onClick={togglePublicModal}
                    ></div>

                    {/* Card de Edición */}
                    <div className="relative z-10">
                        <CardEditPubli publicacion={publicacion} onClose={togglePublicModal} />
                    </div>
                </div>
            )}
            {OpenConfirmationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Overlay opaco */}
                    <div
                        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
                        onClick={toggleConfirmationModal}
                    ></div>

                    {/* Card de Confirmacion */}
                    <div className="relative z-10">
                        <CardConfirmation
                            onClose={toggleConfirmationModal}
                            onConfirm={handleDelete}
                            message="¿Estás seguro de que deseas eliminar esta publicación?"
                        />
                    </div>
                </div>
            )}
        </>
    )
}