import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/context/AuthModalContext";
import { useState } from "react";

interface CardRegisterProps {
    onClose?: () => void;
}

export const CardRegister = ({ onClose }: CardRegisterProps) => {
    const { signup, loading, error } = useAuth();
    const { executeOnSuccess, closeModal } = useAuthModal();

    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [telefono, setTelefono] = useState('');
    const [rol, setRol] = useState('ARRENDATARIO');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userData = {
            nombre,
            correo,
            clave,
            cedula,
            telefono,
            rol
        };

        const result = await signup(userData);
        if (result?.success) {
            executeOnSuccess();
            closeModal();
        }
    };

    return (
        <div className="relative w-[350px] h-[650px] flex flex-col justify-center items-center rounded-[20px] p-6 shadow-[0px_10px_10px_rgba(0,0,0,0.2)] bg-[#FEFCEC] overflow-hidden">

            <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#EB8369] rounded-full"></div>

            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#EB8369] rounded-full"></div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-[#393939] bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
                >
                    <span className="text-[#f1f1f1] text-xl font-bold">×</span>
                </button>
            )}

            <form onSubmit={handleRegister} className="w-full h-auto flex flex-col items-center justify-center gap-5 z-10">
                <h1 className="text-[#393939] font-bold text-3xl">Registrate</h1>

                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <input
                    type="text"
                    placeholder="Cedula"
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <input
                    type="tel"
                    placeholder="Telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <div className="flex flex-col w-full">
                    <label className="text-sm font-semibold text-[#393939] mb-1 z-10">Rol de tu perfil</label>
                    <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-md border border-[#BCBBB0] bg-transparent text-[#393939] placeholder-gray-400 focus:outline-none focus:border-[#EB8369]"
                    >
                        <option value="ARRENDADOR" className="bg-[#FEFCEC] text-[#393939]">Arrendador</option>
                        <option value="ARRENDATARIO" className="bg-[#FEFCEC] text-[#393939]">Arrendatario</option>
                        <option value="PRESTADOR_SERVICIO" className="bg-[#FEFCEC] text-[#393939]">Técnico</option>
                    </select>
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    required
                    className="w-full h-[40px] bg-[#FEFCEC] text-sm rounded-[10px] border-[1px] border-[#BCBBB0] text-[#393939] p-2 focus:outline-none focus:border-[#EB8369]"
                />

                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-[60%] h-[40px] rounded-[10px] bg-[#EB8369] shadow-[0px_5px_10px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-[#d67359] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="font-semibold text-sm text-white">
                        {loading ? 'Registrando...' : 'Registrar'}
                    </span>
                </button>
            </form>
        </div>
    );
};
