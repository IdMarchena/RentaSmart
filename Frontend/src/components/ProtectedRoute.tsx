import type { ReactNode } from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';

interface ProtectedRouteProps {
    children: ReactNode;
    redirectTo?: string;
}

export function ProtectedRoute({
    children,
    redirectTo = '/'
}: ProtectedRouteProps) {
    const { isLoading, isAuthenticated } = useRequireAuth(redirectTo);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
