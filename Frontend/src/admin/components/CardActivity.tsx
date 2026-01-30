import imgAdd from "../../assets/add.png"
import imgEdit from "../../assets/editar.png"
import imgDelete from "../../assets/borrar.png"
import imgContract from "../../assets/folder.png"
import imgHistory from "../../assets/history.png"
import imgChat from "../../assets/chat-on.png"
import imgMessage from "../../assets/email.png"
import imgService from "../../assets/servicios-on.png"

export interface ActivityItem {
    id: string
    type: 'publicacion_creada' | 'publicacion_editada' | 'publicacion_eliminada' |
    'contrato_creado' | 'contrato_firmado' | 'contrato_finalizado' |
    'chat_creado' | 'mensaje_enviado' | 'servicio_creado'
    description: string
    timestamp: string
}

interface CardActivityProps {
    activity: ActivityItem
}

export const CardActivity = ({ activity }: CardActivityProps) => {
    const activityConfig = {
        publicacion_creada: {
            icon: imgAdd,
            title: 'Publicación Creada',
            bgColor: 'bg-green-50'
        },
        publicacion_editada: {
            icon: imgEdit,
            title: 'Publicación Editada',
            bgColor: 'bg-blue-50'
        },
        publicacion_eliminada: {
            icon: imgDelete,
            title: 'Publicación Eliminada',
            bgColor: 'bg-red-50'
        },
        contrato_creado: {
            icon: imgContract,
            title: 'Contrato Creado',
            bgColor: 'bg-yellow-50'
        },
        contrato_firmado: {
            icon: imgContract,
            title: 'Contrato Firmado',
            bgColor: 'bg-green-50'
        },
        contrato_finalizado: {
            icon: imgContract,
            title: 'Contrato Finalizado',
            bgColor: 'bg-gray-50'
        },
        chat_creado: {
            icon: imgChat,
            title: 'Chat Creado',
            bgColor: 'bg-purple-50'
        },
        mensaje_enviado: {
            icon: imgMessage,
            title: 'Mensaje Enviado',
            bgColor: 'bg-blue-50'
        },
        servicio_creado: {
            icon: imgService,
            title: 'Servicio Creado',
            bgColor: 'bg-orange-50'
        }
    }

    const config = activityConfig[activity.type]

    // Formatear fecha
    const formattedDate = new Date(activity.timestamp).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    return (
        <div className={`w-full h-[70px] flex flex-row items-start justify-between ${config.bgColor} border-[1px] border-[#BCBBB0] rounded-[20px] shadow-[0px_5px_5px_rgba(0,0,0,0.1)] p-2 hover:shadow-lg transition-all`}>
            <div className="w-[75%] flex flex-row items-start justify-start gap-2 mt-1">
                <div className="w-[35px] h-[35px] bg-white rounded-full flex items-center justify-center shadow-sm">
                    <img src={config.icon} alt={config.title} className="w-[20px] h-[20px] object-cover" />
                </div>
                <div className="w-[70%] flex flex-col items-start justify-center gap-1">
                    <h1 className="text-[#393939] text-[12px] font-bold">{config.title}</h1>
                    <p className="text-[#393939] text-[8px] font-medium line-clamp-2">{activity.description}</p>
                </div>
            </div>

            <div className="w-[25%] flex flex-row items-center justify-end gap-1 flex-nowrap max-[908px]:justify-end">
                <img src={imgHistory} alt="history" className="w-[12px] h-[12px] object-cover mt-1" />
                <span className="text-[#393939] text-[8px] font-medium">{formattedDate}</span>
            </div>
        </div>
    )
}