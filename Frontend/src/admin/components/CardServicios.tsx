import imgCopy from "../../assets/Copy.png"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"

 export const CardServicios = () => {
    return (
        <div className="w-full h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2">
            <div className="w-[75%] flex flex-row items-start justify-start gap-2 ml-2">
                <img src={imgCopy} alt="add" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2"/>
                <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
                    <h1 className="text-[#393939] text-[12px] font-bold">Servicio Reparacion</h1>
                    <p className="text-[#393939] text-[9px] font-medium">Servicion de reparacion en fuga del cifon de la cocina para el apartamento 203 urb villa celicio</p>
                </div>
            </div>
            <div className="w-[25%] flex flex-col items-end justify-end gap-1 flex-nowrap mr-2 mt-1">
                <div className="w-[70%] flex flex-row items-center justify-center gap-1  border-[1px] border-[#BCBBB0] rounded-[20px] p-0.5 bg-emerald-500">
                    <span className="text-[#393939] text-[8px] font-bold">Finalizado</span>
                </div>
                <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap mt-9">
                    <img src={imgVista} alt="vista" className="w-[25px] h-[25px] object-cover cursor-pointer"/>
                    <img src={imgEditar} alt="editar" className="w-[25px] h-[25px] object-cover cursor-pointer"/>
                    <img src={imgBorrar} alt="borrar" className="w-[25px] h-[25px] object-cover cursor-pointer"/>

                </div>
            </div>
        </div>
    );
};
