import imgHistory from "../../assets/history.png"
import imgB1 from "../../assets/b1.jpg"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"
import { CardEditPubli } from "./CardEditPubli"
import {useState} from "react";
import { CardConfirmation} from "@/admin/components/CardConfirmation.tsx";

export const CardsPubli = () => {
    const [OpenPublicModal, setOpenPublicModal] = useState(false);
    const [OpenConfirmationModal, setOpenConfirmationModal] = useState(false);

    const togglePublicModal = () => {
        setOpenPublicModal(!OpenPublicModal);
    };

    const toggleConfirmationModal = () => {
        setOpenConfirmationModal(!OpenConfirmationModal);
    }
    return (
        <>
            <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
                <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                    <img src={imgB1} alt="add" className="hidden md:block w-[50%] h-[90px] object-cover rounded-[20px]"/>
                    <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                        <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold">Apartamento</h1>
                        <p className="text-[#393939] md:text-[10px] text-[8px] font-medium">Moderno apartamento de 2 habitaciones ubicado en una zona tranquila y de fácil acceso. Cuenta con excelente iluminación natural...</p>
                    </div>
                </div>
                <div className="w-[30%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                        <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover"/>
                        <span className="text-[#393939] text-[8px] font-medium">20 ene 2024</span>

                    </div>
                    <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                        <img src={imgVista} alt="vista" className="md:w-[25px] md:h-[25px] w-[20px] h-[20px] object-cover"/>
                        <img src={imgEditar} alt="editar" className="md:w-[25px] md:h-[25px] w-[20px] h-[20px] object-cover cursor-pointer" onClick={togglePublicModal} />
                        <img src={imgBorrar} alt="borrar" className="md:w-[25px] md:h-[25px] w-[20px] h-[20px] object-cover cursor-pointer" onClick={toggleConfirmationModal} />

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

                    {/* Card de Login */}
                    <div className="relative z-10">
                        <CardEditPubli onClose={togglePublicModal} />
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
                        <CardConfirmation onClose={toggleConfirmationModal} />
                    </div>
                </div>
            )}

        </>

    )
}