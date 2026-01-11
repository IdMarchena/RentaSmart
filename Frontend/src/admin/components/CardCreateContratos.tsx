import imgUpload from "@/assets/upload.png"
import { useState, useEffect } from "react"
import { useContratos } from "../hooks/useContratos"
import { usePublications } from "../../hooks/usePublications"
import { useAuthContext } from "../../context/AuthContext"
import { useUsers, type UserSearchResult } from "../hooks/useUsers"

interface CardCreateContratosProps {
    onClose?: () => void
}

const CardCreateContratos = ({ onClose }: CardCreateContratosProps) => {
    const { user } = useAuthContext()
    const { createContrato, uploadDocumentoPDF } = useContratos()
    const { publications, getPublications } = usePublications()
    const { searchUsers } = useUsers()

    const [publicacionId, setPublicacionId] = useState<number>(0)
    const [arrendatarioId, setArrendatarioId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null)
    const [showUserList, setShowUserList] = useState(false)
    const [filteredUsers, setFilteredUsers] = useState<UserSearchResult[]>([])
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [precioMensual, setPrecioMensual] = useState<number>(0)
    const [depositoSeguridad, setDepositoSeguridad] = useState<number>(0)
    const [diaPago, setDiaPago] = useState<number>(1)
    const [terminosCondiciones, setTerminosCondiciones] = useState('')
    const [clausulasEspeciales, setClausulasEspeciales] = useState('')
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPublications()
    }, [])

    const handleSearchUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)

        if (query.length >= 3) {
            const result = await searchUsers(query)
            if (result.success && result.data) {
                setFilteredUsers(result.data)
            }
        } else {
            setFilteredUsers([])
        }
    }

    const handleSelectUser = (selectedUser: UserSearchResult) => {
        setSelectedUser(selectedUser)
        setArrendatarioId(selectedUser.id)
        setSearchQuery(selectedUser.nombre)
        setShowUserList(false)
        setFilteredUsers([])
    }

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

        if (!user) {
            alert('Debes iniciar sesión')
            return
        }

        if (!publicacionId || !arrendatarioId || !fechaInicio || !fechaFin || !precioMensual) {
            alert('Por favor completa todos los campos obligatorios')
            return
        }

        setLoading(true)

        try {
            // Buscar la publicación para obtener el inmueble_id
            const publicacionSeleccionada = publications.find(p => p.id === publicacionId)
            if (!publicacionSeleccionada?.inmueble?.id) {
                alert('La publicación seleccionada no tiene un inmueble asociado')
                return
            }

            // Crear el contrato
            const contratoData = {
                publicacion_id: publicacionId,
                inmueble_id: publicacionSeleccionada.inmueble.id,
                arrendador_id: user.id,
                arrendatario_id: arrendatarioId,
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                precio_mensual: precioMensual,
                deposito_seguridad: depositoSeguridad,
                dia_pago: diaPago,
                terminos_condiciones: terminosCondiciones || 'Términos estándar de arrendamiento',
                clausulas_especiales: clausulasEspeciales,
            }

            const result = await createContrato(contratoData)

            if (result.success && result.data) {
                // Si hay PDF, subirlo
                if (pdfFile) {
                    await uploadDocumentoPDF(pdfFile, result.data.id)
                }

                alert('Contrato creado exitosamente')
                if (onClose) onClose()
            } else {
                alert(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error('Error al crear contrato:', error)
            alert('Error al crear el contrato')
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
                <h1 className="text-[#393939] font-bold text-3xl">Crea tu Contrato</h1>
                <span className="text-[#393939] font-semibold text-sm">Completa todos los campos requeridos</span>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Publicación <span className="text-red-500">*</span></label>
                    <select
                        value={publicacionId}
                        onChange={(e) => setPublicacionId(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] focus:outline-none focus:border-[#EB8369]"
                        required
                    >
                        <option value={0}>Selecciona una publicación</option>
                        {publications.map((pub) => (
                            <option key={pub.id} value={pub.id}>
                                {pub.titulo} - {pub.inmueble?.direccion}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Arrendatario <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Buscar por correo, nombre o cédula..."
                        value={searchQuery}
                        onChange={handleSearchUsers}
                        onFocus={() => setShowUserList(true)}
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                    {selectedUser && (
                        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-xs text-green-800">
                                <strong>Seleccionado:</strong> {selectedUser.nombre} ({selectedUser.correo})
                            </p>
                        </div>
                    )}
                    {showUserList && searchQuery.length >= 3 && filteredUsers.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {filteredUsers.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleSelectUser(user)}
                                    className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                                >
                                    <p className="text-sm font-semibold text-gray-800">{user.nombre}</p>
                                    <p className="text-xs text-gray-600">{user.correo}</p>
                                    {user.cedula && <p className="text-xs text-gray-500">CC: {user.cedula}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Fecha Inicio *</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Fecha Fin *</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Precio Mensual *</label>
                        <input
                            type="number"
                            placeholder="Ej: 500000"
                            value={precioMensual || ''}
                            onChange={(e) => setPrecioMensual(Number(e.target.value))}
                            className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-semibold text-[#393939] mb-1">Depósito</label>
                        <input
                            type="number"
                            placeholder="Ej: 500000"
                            value={depositoSeguridad || ''}
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
                        placeholder="Ej: 5"
                        value={diaPago}
                        onChange={(e) => setDiaPago(Number(e.target.value))}
                        className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Términos y Condiciones</label>
                    <textarea
                        placeholder="Términos del contrato..."
                        value={terminosCondiciones}
                        onChange={(e) => setTerminosCondiciones(e.target.value)}
                        className="w-full h-20 bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369] resize-none"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1">Cláusulas Especiales</label>
                    <textarea
                        placeholder="Cláusulas adicionales (opcional)"
                        value={clausulasEspeciales}
                        onChange={(e) => setClausulasEspeciales(e.target.value)}
                        className="w-full h-16 bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369] resize-none"
                    />
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 text-center">
                        Adjuntar Contrato PDF (opcional)
                    </label>
                    <div className="w-full">
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-[#FEFCEC] hover:bg-gray-100 transition"
                        >
                            <img src={imgUpload} alt="upload" className="w-10 h-10 mb-2" />
                            <p className="text-sm font-semibold text-gray-700">
                                {pdfFile ? pdfFile.name : 'Cargar Documento PDF'}
                            </p>
                            <input
                                id="file-upload"
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
                            {loading ? 'Creando...' : 'Crear Contrato'}
                        </span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CardCreateContratos