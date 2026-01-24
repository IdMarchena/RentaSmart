import { Aside } from "../components/Aside"
import imgAdd1 from "../../assets/add-1.png"
import { CardContratos } from "../components/CardContratos"
import { useState, useEffect } from "react"
import CardCreateContratos from "../components/CardCreateContratos"
import { useAuthContext } from "../../context/AuthContext"
import { useContrato as useContratosHook } from "@/hooks/useContrato"

export const ContratoDash = () => {
    const { user } = useAuthContext()
    const {contratos, loading, getByArrendadorId } = useContratosHook()
    const [OpenPublicModal, setOpenPublicModal] = useState(false)
    const [selectedContratoUrl, setSelectedContratoUrl] = useState<string | null>(null)

    const togglePublicModal = () => {
        setOpenPublicModal(!OpenPublicModal)
    } 

// Cambia esto en tu useEffect y funciones de carga
useEffect(() => {
    const load = async () => {
        if (user?.id) {
            // Si tu ID es un string (UUID), no uses parseInt. 
            // Si el repo espera número, úsalo. Si no, quítalo.
            await getByArrendadorId(Number(user.id)); 
        }
    };
    load();
}, [user?.id]); // Solo depende del ID del usuario

    const handleCloseModal = () => {
        setOpenPublicModal(false)
        if (user?.id) {
            getByArrendadorId(parseInt(user.id))
        }
    }


    const handleViewPDF = (pdfUrl: string | undefined) => {
            console.log("PDF URL recibida:", pdfUrl)
        if (pdfUrl) {
            setSelectedContratoUrl(pdfUrl)
        }
    }

    return (
        <>
            <div className="w-full h-screen flex flex-row">
                <Aside />
                <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                    <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3 cursor-pointer">
                        <h1 className="text-[#393939] text-[20px] font-bold">Tus Contratos</h1>
                        <div className="flex flex-row items-center gap-1 rounded-[10px] bg-[#EB8369] p-2 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] cursor-pointer" onClick={togglePublicModal}>
                            <img src={imgAdd1} alt="" className="w-[20px] h-[20px] object-cover" />
                            <span className="text-[#FFFFFF] text-[12px] font-bold">Crear</span>
                        </div>
                    </div>
                    <div className="w-full h-[100vh] flex flex-row items-center justify-start gap-10 mt-5 max-[890px]:flex-col max-[890px]:h-[200vh]">
                        <div className="w-[50%] h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[100vh]">
                            {loading ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB8369]"></div>
                                </div>
                            ) : contratos.length === 0 ? (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-500 text-sm">No tienes contratos aún</p>
                                </div>
                            ) : (
                                contratos.map((contrato) => (
                                    <CardContratos
                                        key={contrato.id}
                                        contrato={contrato}
                                        onViewPDF={handleViewPDF}
                                        onDelete={() => getByArrendadorId(parseInt(user!.id))}
                                    />
                                ))
                            )}
                        </div>
                        <div className="w-[50%] h-[100vh] flex flex-col items-center justify-center gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-hidden p-5 max-[890px]:w-full">
                            <span className="text-[#393939] text-[14px] font-bold">Vista Previa del Contrato</span>
                            {selectedContratoUrl ? (
                                <iframe
                                    src={selectedContratoUrl}
                                    className="w-full h-full rounded-lg"
                                    title="Vista previa del contrato"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-500 text-sm text-center">
                                        Selecciona el botón "👁️ Vista" en un contrato para ver el PDF aquí
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {OpenPublicModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    ></div>
                    <div className="relative z-10">
                        <CardCreateContratos onClose={handleCloseModal} />
                    </div>
                </div>
            )}
        </>
    )
}