import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import type { UsuarioRegistrado } from "../types/entities";

// Configurar axios para enviar cookies
axios.defaults.withCredentials = true;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6000/api/v1';

interface LoginResponse {
    token: string;
    user: UsuarioRegistrado;
}

interface SignupData {
    nombre: string;
    correo: string;
    clave: string;
    cedula: string;
    telefono: string;
    rol: string;
}

export const useAuth = () => {
    const navigate = useNavigate();
    const { login: contextLogin, logout: contextLogout } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
                email,
                password
            });

            if (response.status === 200 && response.data) {
                contextLogin(response.data.user, response.data.token);
                navigate('/');
                return { success: true };
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData: SignupData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<LoginResponse>(`${API_URL}/auth/signup`, userData);

            if (response.status === 200 || response.status === 201) {
                contextLogin(response.data.user, response.data.token);
                navigate('/');
                return { success: true };
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Error al registrarse';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        contextLogout();
        navigate('/login');
    };

    return {
        loading,
        error,
        login,
        signup,
        logout
    };
};