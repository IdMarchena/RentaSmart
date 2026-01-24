import { useNavigate } from 'react-router-dom'
import imgCopy from "../../assets/Copy.png"
import imgVista from "../../assets/vista.png"
import imgEditar from "../../assets/editar.png"
import imgBorrar from "../../assets/borrar.png"
import type { Servicio } from '@/types/entitys'

interface CardServiciosProps {
    servicio: Servicio;
}

export const CardServicios = ({ servicio }: CardServiciosProps) => {
    const navigate = useNavigate()

    // Función para manejar colores del estado
    const getStatusColor = (estado: string) => {
        switch (estado) {
            case 'ACTIVO': return 'bg-emerald-500';
            case 'PENDIENTE': return 'bg-yellow-500';
            case 'FINALIZADO': return 'bg-blue-500';
            default: return 'bg-gray-400';
        }
    };

    // Función para ver detalles del servicio
    const handleViewService = () => {
        navigate(`/servicio/${servicio.id}`)
    };

    // Función para editar servicio
    const handleEditService = () => {
        // TODO: Implementar modal de edición
        console.log('Editar servicio:', servicio.id)
    };

    // Función para eliminar servicio
    const handleDeleteService = () => {
        // TODO: Implementar lógica de eliminación
        console.log('Eliminar servicio:', servicio.id)
    };

    return (
        <div className="w-full min-h-[105px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2 hover:shadow-md transition-shadow">
            <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
                <img src={imgCopy} alt="icon" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2"/>
                <div className="w-[85%] flex flex-col items-start justify-center gap-1 mt-2">
                    {/* Título Real */}
                    <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold line-clamp-1">
                        {servicio.nombre}
                    </h1>
                    {/* Descripción Real */}
                    <p className="text-[#393939] md:text-[10px] text-[8px] font-medium line-clamp-2">
                        {servicio.descripcion}
                    </p>
                    {/* Precio Real */}
                    <span className="text-[#EB8369] font-bold text-[10px]">
                        ${servicio.precio.toLocaleString()}
                    </span>
                </div>
            </div>

            <div className="w-[30%] flex flex-col items-end justify-between h-full mr-2 mt-1">
                {/* Estado Real */}
                <div className={`px-3 py-0.5 rounded-[20px] border-[1px] border-[#BCBBB0] ${getStatusColor(servicio.estadoServicio)}`}>
                    <span className="text-white md:text-[9px] text-[7px] font-bold uppercase">
                        {servicio.estadoServicio}
                    </span>
                </div>

                {/* Acciones */}
                <div className="flex flex-row items-start justify-end gap-1 flex-nowrap mt-4">
                    <img 
                        src={imgVista} 
                        alt="vista" 
                        className="md:w-[22px] md:h-[22px] w-[18px] h-[18px] object-cover cursor-pointer hover:scale-110 transition-transform"
                        onClick={handleViewService}
                    />
                    <img 
                        src={imgEditar} 
                        alt="editar" 
                        className="md:w-[22px] md:h-[22px] w-[18px] h-[18px] object-cover cursor-pointer hover:scale-110 transition-transform"
                        onClick={handleEditService}
                    />
                    <img 
                        src={imgBorrar} 
                        alt="borrar" 
                        className="md:w-[22px] md:h-[22px] w-[18px] h-[18px] object-cover cursor-pointer hover:scale-110 transition-transform"
                        onClick={handleDeleteService}
                    />
                </div>
            </div>
        </div>
    );
};