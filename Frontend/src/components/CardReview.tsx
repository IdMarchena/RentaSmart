import imgUser from "../assets/user.png"
import imgCalend from "../assets/calendar.png"
import { Rating } from '@mui/material'

interface CardReviewProps {
    calificacion: {
        id: number
        puntaje: number
        comentario: string
        created_at?: string // Opcional por si viene una o la otra
        fecha?: string      // Opcional por si viene una o la otra
        usuario?: {
            nombre: string
        } | null
    }
}

export const CardReview = ({ calificacion }: CardReviewProps) => {
    // 1. Priorizamos 'fecha' o 'created_at' y limpiamos el formato
    const fechaOriginal = calificacion.fecha || calificacion.created_at || "";
    
    // 2. Convertimos "2026-01-22 01:02..." en "2026-01-22T01:02..." 
    // reemplazando el espacio por una 'T' para que JS lo entienda siempre.
    const fechaLimpia = fechaOriginal.replace(" ", "T");

    const fechaFormateada = fechaOriginal 
        ? new Date(fechaLimpia).toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        : 'Fecha no disponible';

    const nombreCompleto = 
        calificacion.usuario?.nombre || 
        (calificacion as any).nombreUsuario || 
        'Anónimo';

    return (
        <div className="w-full min-h-[150px] rounded-[10px] border-[1px] border-[#C7C7C7] p-5 flex flex-col items-start gap-2 bg-[#FEFEFE]">
            <div className="flex flex-row items-start gap-2 w-full justify-between flex-wrap">
                <div className="flex flex-row items-center gap-2">
                    <img src={imgUser} alt={nombreCompleto} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex flex-col items-start">
                        <h2 className="text-[#393939] text-sm md:text-lg font-bold">{nombreCompleto}</h2>
                        <Rating name="read-only" value={calificacion.puntaje} readOnly size="small" />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <img src={imgCalend} alt="calendar" className="w-5 h-5" />
                    <span className="text-[#A6A6A6] text-[12px] md:text-[12px] font-bold">{fechaFormateada}</span>
                </div>
            </div>
            <p className="text-[#A6A6A6] text-[12px] md:text-[12px] font-normal">{calificacion.comentario}</p>
        </div>
    )
}