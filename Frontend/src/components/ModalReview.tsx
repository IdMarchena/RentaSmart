import { useState } from 'react'
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

    const handleSubmit = async (e: React.FormEvent) => {
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
            setError(err.message || 'Error al enviar la calificación')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[95%] sm:w-[600px] max-h-[90vh] bg-[#FEFCEC] rounded-[15px] shadow-xl p-6 overflow-y-auto custom-scrollbar relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition"
            >
                <span className="text-[#f1f1f1] text-xl font-bold">×</span>
            </button>

            <h2 className="text-[#393939] text-xl font-bold mb-2">Calificar Publicación</h2>
            <p className="text-[#6B7280] text-sm mb-6">{publicacionTitulo}</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2">
                    <label className="text-sm font-semibold text-[#393939]">Tu calificación</label>
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
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="Describe tu experiencia con este inmueble..."
                        className="w-full h-[120px] bg-[#FEFEFE] text-sm rounded-[10px] border border-[#BCBBB0] text-[#393939] p-3 focus:outline-none focus:border-[#EB8369] resize-none"
                        maxLength={500}
                    />
                    <span className="text-xs text-gray-500 mt-1 text-right">
                        {comentario.length}/500 caracteres
                    </span>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
                        {error}
                    </div>
                )}

                <div className="flex gap-3 justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 rounded-[10px] border border-[#BCBBB0] text-[#393939] font-semibold text-sm hover:bg-gray-100 transition"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 rounded-[10px] bg-[#EB8369] text-white font-semibold text-sm hover:bg-[#d67359] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Enviando...' : 'Enviar Calificación'}
                    </button>
                </div>
            </form>
        </div>
    )
}
