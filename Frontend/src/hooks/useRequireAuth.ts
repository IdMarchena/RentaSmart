import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';


export const useRequireAuth = (redirectTo: string = '/login') => {
    const { isAuthenticated, isLoading } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate(redirectTo);
        }
    }, [isAuthenticated, isLoading, navigate, redirectTo]);

    return { isAuthenticated, isLoading };
};
