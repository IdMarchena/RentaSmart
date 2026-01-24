import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Rating } from '@mui/material'

interface ModalReviewProps {
    onClose: () => void
    onSubmit: (puntuacion: number, comentario: string) => Promise<void>
    publicacionTitulo: string
}

export const ModalReview = ({ onClose, onSubmit, publicacionTitulo }: ModalReviewProps) => {
    const [puntuacion, setPuntuacion] = useState<number>(5)
    const [comentario, setComentario] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const MAX_CHARACTERS = 500

    // Manejador de cambio con tipado explícito
    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setComentario(value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        
        if (!comentario.trim()) {
            setError('Por favor escribe un comentario')
            return
        }

        setLoading(true)
        setError('')

        try {
            await onSubmit(puntuacion, comentario)
            onClose()
        } catch (err: any) {
            setError(err.message || 'Error al enviar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[95%] sm:w-[600px] max-h-[90vh] bg-[#FEFCEC] rounded-[15px] shadow-xl p-6 relative border border-[#BCBBB0] overflow-y-auto">
            <button 
                type="button"
                onClick={onClose} 
                className="absolute top-4 right-4 text-[#393939] hover:text-[#EB8369] font-bold text-xl transition-colors"
            >
                ×
            </button>

            <h2 className="text-[#393939] text-xl font-bold mb-1">Calificar Publicación</h2>
            <p className="text-[#6B7280] text-sm mb-6">{publicacionTitulo}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2 bg-white/30 py-4 rounded-lg">
                    <label className="text-sm font-semibold text-[#393939]">Tu puntuación</label>
                    <Rating
                        value={puntuacion}
                        onChange={(_, newValue) => setPuntuacion(newValue || 5)}
                        size="large"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-[#393939] mb-2">Cuéntanos tu experiencia *</label>
                    <textarea
                        value={comentario}
                        onChange={handleTextChange}
                        maxLength={MAX_CHARACTERS}
                        placeholder="Describe tu experiencia..."
                        className="w-full h-[120px] bg-[#FEFEFE] text-sm rounded-[10px] border border-[#BCBBB0] p-3 focus:outline-none focus:border-[#EB8369] focus:ring-1 focus:ring-[#EB8369] resize-none transition-all"
                    />
                    
                    <div className="flex justify-end mt-1">
                        <span className={`text-xs font-bold ${comentario.length >= MAX_CHARACTERS ? 'text-red-500' : 'text-gray-500'}`}>
                            {comentario.length} / {MAX_CHARACTERS} caracteres
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-xs font-medium">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 justify-end mt-2">
                    <button 
                        type="button" 
                        onClick={onClose} 
                        className="px-6 py-2 border border-[#BCBBB0] rounded-[10px] text-sm font-semibold text-[#393939] hover:bg-white transition-colors"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading || !comentario.trim()}
                        className="px-6 py-2 bg-[#EB8369] text-white rounded-[10px] text-sm font-semibold hover:bg-[#d67359] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        {loading ? 'Enviando...' : 'Enviar Calificación'}
                    </button>
                </div>
            </form>
        </div>
    )
}
