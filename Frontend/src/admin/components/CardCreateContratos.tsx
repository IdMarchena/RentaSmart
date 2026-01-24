import { useState, useEffect } from "react"
import { useContrato } from '@/hooks/useContrato'
import { usePublicaciones } from "../../hooks/usePublicaciones"
import { useAuthContext } from "../../context/AuthContext"
import { useUsers, type UserSearchResult } from "../hooks/useUsers"

import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { es } from 'date-fns/locale/es'
import { differenceInMonths } from 'date-fns' // Importante para el cálculo de meses
registerLocale('es', es)

interface CardCreateContratosProps {
    onClose?: () => void
}

const CardCreateContratos = ({ onClose }: CardCreateContratosProps) => {
    const { user } = useAuthContext()
    const { createContratoCompleto, loading: contratoLoading } = useContrato()
    const { publications, getAll: getPublications, loading: pubLoading } = usePublicaciones()
    const { searchUsers } = useUsers()

    // --- ESTADOS ---
    const [publicacionId, setPublicacionId] = useState<number>(0)
    const [arrendatarioId, setArrendatarioId] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredUsers, setFilteredUsers] = useState<UserSearchResult[]>([])
    const [showUserList, setShowUserList] = useState(false)
    
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    const [precioMensual, setPrecioMensual] = useState<number | "">("")
    const [depositoSeguridad, setDepositoSeguridad] = useState<number | "">("")
    const [diaDePago, setDiaPago] = useState<number>(1)
    
    const [contenido, setContenido] = useState('') 
    const [clausulasEspeciales, setClausulasEspeciales] = useState('')

    // FINANCIACIÓN
    const [numeroCuotas, setNumeroCuotas] = useState<number | "">(1)
    const [montoTotal, setMontoTotal] = useState<number | "">("")
    const [interes, setInteres] = useState<number | "">(0)
    const [valorCuota, setValorCuota] = useState<number>(0)
    const [, forceUpdate] = useState({}); // Forzar re-render sin variable unused

    useEffect(() => { getPublications() }, [])

    // --- AUTOMATIZACIÓN 1: DÍA DE PAGO Y NÚMERO DE CUOTAS ---
    useEffect(() => {
        if (startDate) {
            // Setea el día de pago automáticamente según el inicio
            setDiaPago(startDate.getDate());
        }

        if (startDate && endDate) {
            // Calcula la diferencia de meses exacta
            const meses = differenceInMonths(endDate, startDate);
            // Si la diferencia es 0 (mismo mes), ponemos 1 cuota por defecto
            const nuevasCuotas = meses <= 0 ? 1 : meses;
            setNumeroCuotas(nuevasCuotas);
            console.log('📅 Nº cuotas actualizado por fechas:', nuevasCuotas);
        }
    }, [startDate, endDate]);

    // --- AUTOMATIZACIÓN 2: CÁLCULO DE VALOR CUOTA EN TIEMPO REAL ---
    useEffect(() => {
        const m = Number(montoTotal) || 0;
        const n = Number(numeroCuotas) || 0;
        const i = Number(interes) || 0;

        console.log('🔍 Cálculo Valor Cuota:', { montoTotal: m, numeroCuotas: n, interes: i });
        console.log('🔍 Estados actuales:', { montoTotal, numeroCuotas, interes, valorCuota });

        if (m > 0 && n > 0) {
            const montoConInteres = m + (m * (i / 100));
            const calculo = Math.round(montoConInteres / n);
            console.log('💰 Resultado cálculo:', { montoConInteres, calculo });
            console.log('🔄 Antes de setValorCuota:', valorCuota);
            setValorCuota(calculo);
            console.log('✅ Después de setValorCuota (asincrónico):', calculo);
            forceUpdate({}); // Forzar re-render inmediato
        } else {
            console.log('⚠️ Valores insuficientes para cálculo');
            setValorCuota(0);
            forceUpdate({}); // Forzar re-render inmediato
        }
    }, [montoTotal, numeroCuotas, interes]); // Se dispara ante cualquier cambio

    // Cargar datos de la publicación seleccionada
    useEffect(() => {
        if (publicacionId > 0) {
            const selectedPub = publications.find(p => p.id === publicacionId);
            if (selectedPub) {
                const precio = selectedPub.precio || 0;
                setPrecioMensual(precio);
                setDepositoSeguridad(Math.round(precio * 0.12));
            }
        }
    }, [publicacionId, publications]);

    const handleSearchUsers = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)
        if (query.length >= 3) {
            const result = await searchUsers(query)
            if (result.success && result.data) {
                setFilteredUsers(result.data)
                setShowUserList(true)
            }
        } else {
            setFilteredUsers([])
        }
    }

    const handleSelectUser = (u: UserSearchResult) => {
        setArrendatarioId(u.id)
        setSearchQuery(u.nombre)
        setShowUserList(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!user || !publicacionId || !arrendatarioId || !startDate || !endDate) {
            alert('Por favor completa los campos obligatorios (*)')
            return
        }

        const pub = publications.find(p => p.id === publicacionId)
        
        const payload = {
            financiacion: {
                numeroCuotas: Number(numeroCuotas),
                valorCuota: valorCuota,
                montoTotal: Number(montoTotal),
                interes: Number(interes)
            },
            contrato: {
                contenido,
                idUsuarioArrendatario: Number(arrendatarioId),
                idUsuarioArrendador: Number(user.id),
                idInmueble: pub?.inmueble?.id,
                fechaInicio: startDate.toISOString(), 
                fechaFinalizacion: endDate.toISOString(),
                precio: Number(precioMensual),
                estadoContrato: 'ACTIVO',
                deposito: Number(depositoSeguridad),
                clausulasEspeciales,
                diaDePago 
            }
        }

        const result = await createContratoCompleto(payload)
        if (result.success) {
            alert('¡Contrato y Financiación creados con éxito!')
            if (onClose) onClose()
        } else {
            alert(`Error: ${result.error}`)
        }
    }

    return (
        <div className="relative md:w-[700px] h-[85vh] w-[95%] flex flex-col justify-start items-center rounded-[25px] p-8 shadow-2xl bg-[#FEFCEC] overflow-y-auto custom-scrollbar-2 border border-[#BCBBB0]">
            {onClose && (
                <button type="button" onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-all">
                    <span className="text-[#393939] text-xl font-bold">×</span>
                </button>
            )}

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 mt-4">
                <div className="text-center">
                    <h1 className="text-[#393939] font-black text-3xl tracking-tight">Nuevo Contrato Legal</h1>
                    <p className="text-gray-500 text-sm">Define términos y plan de pagos</p>
                </div>

                {/* SECCIÓN 1: PROPIEDAD Y ARRENDATARIO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#393939] mb-1">PROPIEDAD *</label>
                        <select
                            value={publicacionId}
                            onChange={(e) => setPublicacionId(Number(e.target.value))}
                            className="px-4 py-3 rounded-xl border border-[#BCBBB0] bg-white text-sm outline-none focus:ring-2 focus:ring-[#EB8369]"
                            required
                        >
                            <option value={0}>{pubLoading ? "Cargando..." : "Seleccione..."}</option>
                            {publications.map((p) => <option key={p.id} value={p.id}>{p.titulo}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col relative">
                        <label className="text-xs font-bold text-[#393939] mb-1">ARRENDATARIO *</label>
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            value={searchQuery}
                            onChange={handleSearchUsers}
                            className="px-4 py-3 rounded-xl border border-[#BCBBB0] bg-white text-sm outline-none focus:ring-2 focus:ring-[#EB8369]"
                        />
                        {showUserList && filteredUsers.length > 0 && (
                            <div className="absolute top-full z-50 w-full mt-1 bg-white border border-[#BCBBB0] rounded-xl shadow-xl max-h-40 overflow-y-auto">
                                {filteredUsers.map((u) => (
                                    <div key={u.id} onClick={() => handleSelectUser(u)} className="p-3 hover:bg-[#FDF8E7] cursor-pointer border-b last:border-0 transition-colors">
                                        <p className="text-sm font-bold text-gray-800">{u.nombre}</p>
                                        <p className="text-[10px] text-gray-400">CC: {u.cedula}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* SECCIÓN 2: VIGENCIA */}
                <div className="bg-white p-4 rounded-2xl border border-[#BCBBB0]">
                    <h2 className="text-[#EB8369] font-bold text-[10px] uppercase tracking-widest mb-3">Vigencia</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 mb-1">FECHA INICIO</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                className="w-full p-2 border-b border-[#BCBBB0] outline-none focus:border-[#EB8369] text-sm"
                                placeholderText="Elija fecha"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-gray-400 mb-1">FECHA FIN</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                minDate={startDate || undefined}
                                locale="es"
                                dateFormat="dd/MM/yyyy"
                                className="w-full p-2 border-b border-[#BCBBB0] outline-none focus:border-[#EB8369] text-sm"
                                placeholderText="Elija fecha"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 3: COSTOS Y FINANCIACIÓN */}
                <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-[#393939] mb-1">PRECIO MENSUAL</label>
                            <input type="number" value={precioMensual} onChange={(e) => setPrecioMensual(e.target.value === "" ? "" : Number(e.target.value))} className="p-3 rounded-xl border border-[#BCBBB0] text-sm" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-[#393939] mb-1">DEPÓSITO</label>
                            <input type="number" value={depositoSeguridad} onChange={(e) => setDepositoSeguridad(e.target.value === "" ? "" : Number(e.target.value))} className="p-3 rounded-xl border border-[#BCBBB0] text-sm" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[10px] font-bold text-[#393939] mb-1">DÍA DE PAGO</label>
                            <input 
                                type="number" 
                                value={diaDePago} 
                                onChange={(e) => setDiaPago(Number(e.target.value))} 
                                className="p-3 rounded-xl border border-[#BCBBB0] text-sm bg-orange-50 font-bold" 
                                placeholder="Auto"
                            />
                        </div>
                    </div>

                    <div className="p-5 bg-[#F7F6EB] rounded-[20px] border border-[#BCBBB0] border-dashed grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-full border-b border-[#BCBBB0] pb-2 mb-2 flex justify-between">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Plan de Financiación Automático</h3>
                            <span className="text-[9px] text-[#EB8369] font-bold">Calculado al instante</span>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[9px] font-bold mb-1">MONTO BASE</label>
                            <input 
                                type="number" 
                                placeholder="0" 
                                value={montoTotal} 
                                onChange={(e) => setMontoTotal(e.target.value === "" ? "" : Number(e.target.value))} 
                                className="p-2 rounded-lg border border-[#BCBBB0] text-sm focus:ring-1 focus:ring-[#EB8369] outline-none" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[9px] font-bold mb-1">Nº CUOTAS</label>
                            <input 
                                type="number" 
                                value={numeroCuotas} 
                                onChange={(e) => setNumeroCuotas(e.target.value === "" ? "" : Number(e.target.value))} 
                                className="p-2 rounded-lg border border-[#BCBBB0] text-sm bg-gray-50 font-bold" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[9px] font-bold mb-1">% INTERÉS</label>
                            <input 
                                type="number" 
                                value={interes} 
                                onChange={(e) => setInteres(e.target.value === "" ? "" : Number(e.target.value))} 
                                className="p-2 rounded-lg border border-[#BCBBB0] text-sm focus:ring-1 focus:ring-[#EB8369] outline-none" 
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[9px] font-bold mb-1 text-[#EB8369]">VALOR CUOTA</label>
                            {valorCuota > 0 ? (
                                <>
                                    <div className="p-2 bg-white rounded-lg border-2 border-[#EB8369] text-sm font-black text-[#EB8369] shadow-sm flex items-center justify-center">
                                        ${valorCuota.toLocaleString()}
                                    </div>
                                    {/* Debug: mostrar valor actual */}
                                    <div className="text-[8px] text-gray-400 text-center mt-1">
                                        Debug: {valorCuota} | Tipo: {typeof valorCuota}
                                    </div>
                                </>
                            ) : (
                                <div className="p-2 bg-gray-100 rounded-lg border-2 border-gray-300 text-sm text-gray-400 shadow-sm flex items-center justify-center">
                                    Esperando cálculo...
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 4: TEXTOS LEGALES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#393939] mb-1">CONTENIDO PRINCIPAL</label>
                        <textarea
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            className="h-24 p-3 rounded-xl border border-[#BCBBB0] text-xs outline-none resize-none focus:ring-1 focus:ring-[#EB8369]"
                            placeholder="Cuerpo del contrato..."
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-[#393939] mb-1">CLÁUSULAS ESPECIALES</label>
                        <textarea
                            value={clausulasEspeciales}
                            onChange={(e) => setClausulasEspeciales(e.target.value)}
                            className="h-24 p-3 rounded-xl border border-[#BCBBB0] text-xs outline-none resize-none focus:ring-1 focus:ring-[#EB8369]"
                            placeholder="Reglas adicionales..."
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4 pb-6">
                    <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-400 border border-gray-200">Cancelar</button>
                    <button
                        type="submit"
                        className="flex-1 py-4 rounded-2xl bg-[#EB8369] text-white font-bold shadow-lg hover:translate-y-[-2px] transition-all disabled:opacity-50"
                        disabled={contratoLoading}
                    >
                        {contratoLoading ? 'Guardando...' : 'Legalizar Contrato'}
                    </button>
                </div>
            </form>
            
            <style>{`
                .react-datepicker-wrapper { width: 100%; }
                .react-datepicker { font-family: inherit; border-radius: 12px; border: 1px solid #BCBBB0; }
                .react-datepicker__header { background-color: #FEFCEC; }
                .react-datepicker__day--selected { background-color: #EB8369 !important; border-radius: 8px; }
            `}</style>
        </div>
    )
}

export default CardCreateContratos;