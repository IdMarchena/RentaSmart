import imgUpload from "@/assets/upload.png"
import { useState, useEffect } from "react"
import { useContratos } from "../hooks/useContratos"

interface CardEditContratoProps {
    contrato: any
    onClose?: () => void
}

const CardEditContrato = ({ contrato, onClose }: CardEditContratoProps) => {
    const { updateContrato, uploadDocumentoPDF } = useContratos()

    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [precioMensual, setPrecioMensual] = useState<number>(0)
    const [depositoSeguridad, setDepositoSeguridad] = useState<number>(0)
    const [diaPago, setDiaPago] = useState<number>(1)
    const [terminosCondiciones, setTerminosCondiciones] = useState('')
    const [clausulasEspeciales, setClausulasEspeciales] = useState('')
    const [estado, setEstado] = useState<'pendiente' | 'activo' | 'finalizado' | 'cancelado'>('pendiente')
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (contrato) {
            setFechaInicio(contrato.fecha_inicio.split('T')[0])
            setFechaFin(contrato.fecha_fin.split('T')[0])
            setPrecioMensual(contrato.precio_mensual)
            setDepositoSeguridad(contrato.deposito_seguridad)
            setDiaPago(contrato.dia_pago)
            setTerminosCondiciones(contrato.terminos_condiciones)
            setClausulasEspeciales(contrato.clausulas_especiales || '')
            setEstado(contrato.estado)
        }
    }, [contrato])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            if (file.type === 'application/pdf') {
                setPdfFile(file)
            } else {
                alert('Solo se permiten archivos PDF')
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const updateData: any = {}

            if (fechaInicio !== contrato.fecha_inicio.split('T')[0]) updateData.fecha_inicio = fechaInicio
            if (fechaFin !== contrato.fecha_fin.split('T')[0]) updateData.fecha_fin = fechaFin
            if (precioMensual !== contrato.precio_mensual) updateData.precio_mensual = precioMensual
            if (depositoSeguridad !== contrato.deposito_seguridad) updateData.deposito_seguridad = depositoSeguridad
            if (diaPago !== contrato.dia_pago) updateData.dia_pago = diaPago
            if (terminosCondiciones !== contrato.terminos_condiciones) updateData.terminos_condiciones = terminosCondiciones
            if (clausulasEspeciales !== (contrato.clausulas_especiales || '')) updateData.clausulas_especiales = clausulasEspeciales
            if (estado !== contrato.estado) updateData.estado = estado

            if (Object.keys(updateData).length === 0 && !pdfFile) {
                alert('No hay cambios para guardar')
                return
            }

            const result = await updateContrato(contrato.id, updateData)

            if (result.success) {
                // Si hay nuevo PDF, subirlo
                if (pdfFile) {
                    await uploadDocumentoPDF(pdfFile, contrato.id)
                }

                alert('Contrato actualizado exitosamente')
                if (onClose) onClose()
            } else {
                alert(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error('Error al actualizar contrato:', error)
            alert('Error al actualizar el contrato')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative md:w-[600px] h-[700px] w-[350px] flex flex-col justify-start items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-y-scroll custom-scrollbar-2">
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <form onSubmit={handleSubmit} className="w-full h-auto flex flex-col items-center justify-center gap-4 z-10 mt-10">
                <h1 className="text-[#393939] font-bold text-3xl">Editar Contrato</h1>
                <span className="text-[#393939] font-semibold text-sm">Modifica los campos necesarios</span>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Estado del Contrato</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] focus:outline-none focus:border-[#EB8369]"
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="activo">Activo</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Fecha Inicio</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Fecha Fin</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Precio Mensual</label>
                        <input
                            type="number"
                            value={precioMensual}
                            onChange={(e) => setPrecioMensual(Number(e.target.value))}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Depósito</label>
                        <input
                            type="number"
                            value={depositoSeguridad}
                            onChange={(e) => setDepositoSeguridad(Number(e.target.value))}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                        />
                    </div>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Día de Pago (1-31)</label>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        value={diaPago}
                        onChange={(e) => setDiaPago(Number(e.target.value))}
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Términos y Condiciones</label>
                    <textarea
                        value={terminosCondiciones}
                        onChange={(e) => setTerminosCondiciones(e.target.value)}
                        className="w-full h-20 bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369] resize-none"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Cláusulas Especiales</label>
                    <textarea
                        value={clausulasEspeciales}
                        onChange={(e) => setClausulasEspeciales(e.target.value)}
                        className="w-full h-16 bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369] resize-none"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 text-center">
                        Actualizar Documento PDF
                    </label>
                    <div className="w-full">
                        <label
                            htmlFor="file-upload-edit"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-[#FEFCEC] hover:bg-gray-100 transition"
                        >
                            <img src={imgUpload} alt="upload" className="w-10 h-10 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">
                                {pdfFile ? pdfFile.name : 'Adjuntar Nuevo Documento'}
                            </p>
                            <input
                                id="file-upload-edit"
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-5 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-[50%] h-[40px] rounded-[10px] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        disabled={loading}
                    >
                        <span className="font-semibold text-sm text-black">Cancelar</span>
                    </button>
                    <button
                        type="submit"
                        className="w-[50%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200 disabled:opacity-50"
                        disabled={loading}
                    >
                        <span className="font-semibold text-sm text-white">
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CardEditContrato
