import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import Cookies from 'js-cookie';
import type { UsuarioRegistrado } from '../types/entities';

interface AuthContextType {
    user: UsuarioRegistrado | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: UsuarioRegistrado, token: string) => void;
    logout: () => void;
    updateUser: (user: Partial<UsuarioRegistrado>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const COOKIES = {
    USER: 'rentasmart_user',
    TOKEN: 'rentasmart_token',
} as const;

const COOKIE_OPTIONS = {
    expires: 7,
    secure: false,
    sameSite: 'lax' as const,
    path: '/',
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UsuarioRegistrado | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Cargar datos desde cookies al iniciar
    useEffect(() => {
        try {
            const savedUser = Cookies.get(COOKIES.USER);
            const savedToken = Cookies.get(COOKIES.TOKEN);

            if (savedUser && savedToken) {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }
        } catch (error) {
            console.error('Error al cargar datos de autenticación:', error);

            Cookies.remove(COOKIES.USER);
            Cookies.remove(COOKIES.TOKEN);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Función para login
    const login = (userData: UsuarioRegistrado, authToken: string) => {
        try {
            setUser(userData);
            setToken(authToken);

            Cookies.set(COOKIES.USER, JSON.stringify(userData), COOKIE_OPTIONS);
            Cookies.set(COOKIES.TOKEN, authToken, COOKIE_OPTIONS);
        } catch (error) {
            console.error('Error al guardar datos de autenticación:', error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        Cookies.remove(COOKIES.USER, { path: '/' });
        Cookies.remove(COOKIES.TOKEN, { path: '/' });
    };

    const updateUser = (updatedData: Partial<UsuarioRegistrado>) => {
        if (!user) return;

        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);

        // Actualizar cookie
        Cookies.set(COOKIES.USER, JSON.stringify(updatedUser), COOKIE_OPTIONS);
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useAuthContext() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
    }

    return context;
}

export { AuthContext };
