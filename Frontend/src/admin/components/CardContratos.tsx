import imgHistory from "../../assets/history.png"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"
import imgFolder from "../../assets/folder.png"

export const CardContratos = () => {
    return (
        <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
            <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                <img src={imgFolder} alt="add" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2"/>
                <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                    <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold">Contrato - Apt 123</h1>
                    <p className="text-[#393939] md:text-[10px] text-[8px] font-medium">Contrato de alquiler de apartamento ubicado en una zona tranquila y de fácil acceso. Cuenta con excelente iluminación natural...</p>
                </div>
            </div>
            <div className="w-[30%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                    <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover"/>
                    <span className="text-[#393939] text-[8px] font-medium">20 ene 2024</span>

                </div>
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                    <img src={imgVista} alt="vista" className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer"/>
                    <img src={imgEditar} alt="editar" className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer"/>
                    <img src={imgBorrar} alt="borrar" className="md:w-[25px] md:h-[25px] h-[20px] w-[20px] object-cover cursor-pointer"/>

                </div>
            </div>
           
            
        </div>
    )
}