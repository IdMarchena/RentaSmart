import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

type AuthModalMode = 'login' | 'register';

interface AuthModalContextType {
    isOpenLogin: boolean;
    isOpenRegister: boolean;
    mode: AuthModalMode;
    onSuccessCallback?: () => void;
    openLoginModal: (onSuccess?: () => void) => void;
    openRegisterModal: (onSuccess?: () => void) => void;
    closeModal: () => void;
    switchMode: (mode: AuthModalMode) => void;
    executeOnSuccess: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [isOpenRegister, setIsOpenRegister] = useState(false);
    const [mode, setMode] = useState<AuthModalMode>('login');
    const [onSuccessCallback, setOnSuccessCallback] = useState<(() => void) | undefined>();

    const openLoginModal = useCallback((onSuccess?: () => void) => {
        setMode('login');
        setIsOpenLogin(true);
        if (onSuccess) {
            setOnSuccessCallback(() => onSuccess);
        }
    }, []);

    const openRegisterModal = useCallback((onSuccess?: () => void) => {
        setMode('register');
        setIsOpenRegister(true);
        if (onSuccess) {
            setOnSuccessCallback(() => onSuccess);
        }
    }, []);

    const closeModal = useCallback(() => {
        setIsOpenLogin(false);
        setIsOpenRegister(false);
        setOnSuccessCallback(undefined);
    }, []);

    const switchMode = useCallback((newMode: AuthModalMode) => {
        setMode(newMode);
    }, []);

    const executeOnSuccess = useCallback(() => {
        if (onSuccessCallback) {
            onSuccessCallback();
            setOnSuccessCallback(undefined);
        }
        closeModal();
    }, [onSuccessCallback, closeModal]);

    const value: AuthModalContextType = {
        isOpenLogin,
        isOpenRegister,
        mode,
        onSuccessCallback,
        openLoginModal,
        openRegisterModal,
        closeModal,
        switchMode,
        executeOnSuccess,
    };

    return (
        <AuthModalContext.Provider value={value}>
            {children}
        </AuthModalContext.Provider>
    );
}

export function useAuthModal() {
    const context = useContext(AuthModalContext);

    if (context === undefined) {
        throw new Error('useAuthModal debe ser usado dentro de un AuthModalProvider');
    }

    return context;
}

export { AuthModalContext };
