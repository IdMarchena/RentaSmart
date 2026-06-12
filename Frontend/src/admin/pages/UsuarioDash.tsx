import imgUser from "../../assets/user.png"
import { Aside } from "../components/Aside"
import { useAuthContext } from "../../context/AuthContext"
import { useAuth } from "../../hooks/useAuth"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const UsuarioDash = () => {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { updateProfile } = useAuth()
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        if (user) {
            setNombre(user.nombre || '')
            setCedula(user.cedula || '')
            setTelefono(user.telefono || '')
            setCorreo(user.correo || '')
            setRol(user.rol || '')
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log('Datos del formulario:', { nombre, correo, cedula, telefono, rol })
        console.log('Datos del usuario actual:', user)

        const userData: any = {}

        if (nombre && nombre !== user?.nombre) userData.nombre = nombre
        if (correo && correo !== user?.correo) userData.correo = correo
        if (cedula && cedula !== user?.cedula) userData.cedula = cedula
        if (telefono && telefono !== user?.telefono) userData.telefono = telefono
        if (rol && rol !== user?.rol) userData.rol = rol

        console.log('Cambios detectados:', userData)

        if (Object.keys(userData).length === 0) {
            alert("No hay cambios para guardar")
            return
        }

        try {
            const response = await updateProfile(userData)
            console.log('Respuesta de actualización:', response)

            if (response.success) {
                alert("Perfil actualizado exitosamente")
                navigate('/admin')
            } else {
                alert(`Error: ${response.error}`)
            }
        } catch (error) {
            console.error('Error capturado en handleSubmit:', error)
            alert(`Error inesperado: ${error}`)
        }
    }
    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-center justify-center">
                <div className="w-[50%] max-[890px]:w-[80%] h-auto max-h-[90vh] flex flex-col items-center justify-start gap-5 border-[1px] border-[#EFEDDE] rounded-[10px] p-5 shadow-[0px_10px_10px_rgba(0,0,0,0.2)]">
                    <div className="w-full h-auto flex flex-row items-start justify-center gap-2">
                        <img src={imgUser} alt="" className="w-[40px] h-[40px] object-cover" />
                        <h1 className="text-[#393939] font-bold text-2xl">{user?.nombre}</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                        <div className="w-full flex flex-col gap-3 overflow-y-auto custom-scrollbar-2 max-h-[60vh] px-2">
                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[#393939] text-sm font-bold">Nombre</label>
                                <input
                                    type="text"
                                    placeholder={user?.nombre}
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] px-3 focus:outline-none focus:border-[#EB8369]"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[#393939] text-sm font-bold">Cédula</label>
                                <input
                                    type="text"
                                    placeholder={user?.cedula}
                                    value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}
                                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] px-3 focus:outline-none focus:border-[#EB8369]"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[#393939] text-sm font-bold">Teléfono</label>
                                <input
                                    type="tel"
                                    placeholder={user?.telefono}
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] px-3 focus:outline-none focus:border-[#EB8369]"
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[#393939] text-sm font-bold">Rol</label>
                                <select
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] px-3 focus:outline-none focus:border-[#EB8369]"
                                >
                                    <option value="user">Usuario</option>
                                    <option value="arrendador">Arrendador</option>
                                    <option value="arrendatario">Arrendatario</option>
                                    <option value="prestador_servicio">Prestador de Servicios</option>
                                </select>
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <label className="text-[#393939] text-sm font-bold">Correo</label>
                                <input
                                    type="email"
                                    placeholder={user?.correo}
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] px-3 focus:outline-none focus:border-[#EB8369]"
                                />
                            </div>
                        </div>

                        <div className="w-full flex flex-row items-center justify-center gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="w-[50%] h-[40px] rounded-[10px] border-[1px] border-[#BCBBB0] text-center cursor-pointer hover:bg-gray-100 transition"
                            >
                                <span className="font-semibold text-sm text-[#393939]">Cancelar</span>
                            </button>
                            <button
                                type="submit"
                                className="w-[50%] h-[40px] rounded-[10px] border-[1px] border-[#BCBBB0] text-center bg-[#EB8369] shadow-[0px_10px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#dd7059] transition"
                            >
                                <span className="font-semibold text-sm text-white">Confirmar</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}