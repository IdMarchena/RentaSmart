import imgHistory from "../../assets/history.png"
import imgB1 from "../../assets/b1.jpg"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"

export const CardsPubli = () => {
    return (
        <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
            <div className="w-[75%] flex flex-row items-start justify-start gap-2 ml-2">
                <img src={imgB1} alt="add" className="w-[50%] h-[90px] object-cover rounded-[20px]"/>
                <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                    <h1 className="text-[#393939] text-[12px] font-bold">Apartamento</h1>
                    <p className="text-[#393939] text-[9px] font-medium">Moderno apartamento de 2 habitaciones ubicado en una zona tranquila y de fácil acceso. Cuenta con excelente iluminación natural...</p>
                </div>
            </div>
            <div className="w-[25%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
                    <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover"/>
                    <span className="text-[#393939] text-[8px] font-medium">20 ene 2024</span>

                </div>
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                    <img src={imgVista} alt="vista" className="w-[25px] h-[25px] object-cover"/>
                    <img src={imgEditar} alt="editar" className="w-[25px] h-[25px] object-cover"/>
                    <img src={imgBorrar} alt="borrar" className="w-[25px] h-[25px] object-cover"/>

                </div>
            </div>
           
            
        </div>
    )
}