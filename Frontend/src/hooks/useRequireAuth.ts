import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useAuthModal } from '../context/AuthModalContext';

export const useRequireAuth = (redirectTo: string = '/') => {
    const { isAuthenticated, isLoading } = useAuthContext();
    const { openLoginModal } = useAuthModal();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            openLoginModal();
            navigate(redirectTo);
        }
    }, [isAuthenticated, isLoading, navigate, redirectTo, openLoginModal]);

    return { isAuthenticated, isLoading };
};
