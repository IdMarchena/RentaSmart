import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useRol } from '@/hooks/useRol';
import { ROLES } from '@/hooks/useRol';

interface RolProtectedRouteProps {
  children: ReactNode;
  rolesPermitidos?: string[];
  permisos?: {
    puedeVerPublicaciones?: boolean;
    puedeVerContratos?: boolean;
    puedeVerServicios?: boolean;
    puedeVerMensajes?: boolean;
    puedeCrearPublicaciones?: boolean;
    puedeCrearContratos?: boolean;
    puedeAccederProfesional?: boolean;
  };
  redirectTo?: string;
}

export const RolProtectedRoute = ({ 
  children, 
  rolesPermitidos = [],
  permisos = {},
  redirectTo = '/admin' 
}: RolProtectedRouteProps) => {
  const { 
    loading, 
    roles, 
    esAdministrador, 
    esArrendador, 
    esArrendatario,
    esPrestadorServicio,
    puedeVerPublicaciones,
    puedeVerContratos,
    puedeVerServicios,
    puedeVerMensajes,
    puedeAccederProfesional
  } = useRol();

  // Si está cargando, mostrar un spinner o null
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-gray-500">Verificando permisos...</div>
      </div>
    );
  }

  // Administrador puede acceder a todo
  if (esAdministrador()) {
    return <>{children}</>;
  }

  // Verificar roles específicos
  if (rolesPermitidos.length > 0) {
    const tieneRolPermitido = rolesPermitidos.some(rol => roles[rol as keyof typeof roles]);
    if (!tieneRolPermitido) {
      console.log('Rol no permitido, redirigiendo a', redirectTo);
      return <Navigate to={redirectTo} replace />;
    }
  }

  // Verificar permisos específicos usando los métodos del hook
  if (permisos.puedeVerPublicaciones && !puedeVerPublicaciones()) {
    console.log('No puede ver publicaciones, redirigiendo a', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  if (permisos.puedeVerContratos && !puedeVerContratos()) {
    console.log('No puede ver contratos, redirigiendo a', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  if (permisos.puedeVerServicios && !puedeVerServicios()) {
    console.log('No puede ver servicios, redirigiendo a', redirectTo);
    console.log('puedeVerServicios():', puedeVerServicios());
    console.log('esAdministrador():', esAdministrador());
    console.log('esArrendador():', esArrendador());
    console.log('esArrendatario():', esArrendatario());
    console.log('esPrestadorServicio():', esPrestadorServicio());
    return <Navigate to={redirectTo} replace />;
  }

  if (permisos.puedeVerMensajes && !puedeVerMensajes()) {
    console.log('No puede ver mensajes, redirigiendo a', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  if (permisos.puedeAccederProfesional && !puedeAccederProfesional()) {
    console.log('No puede acceder a profesional, redirigiendo a', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  console.log('Todos los permisos válidos, permitiendo acceso');
  return <>{children}</>;
};

// Componentes de conveniencia para rutas específicas
export const PublicacionesRoute = ({ children }: { children: ReactNode }) => (
  <RolProtectedRoute 
    rolesPermitidos={[ROLES.ADMINISTRADOR, ROLES.ARRENDADOR]}
    permisos={{ puedeVerPublicaciones: true }}
  >
    {children}
  </RolProtectedRoute>
);

export const ContratosRoute = ({ children }: { children: ReactNode }) => (
  <RolProtectedRoute 
    rolesPermitidos={[ROLES.ADMINISTRADOR, ROLES.ARRENDADOR, ROLES.ARRENDATARIO]}
    permisos={{ puedeVerContratos: true }}
  >
    {children}
  </RolProtectedRoute>
);

export const ServiciosRoute = ({ children }: { children: ReactNode }) => {
  console.log('ServiciosRoute - Renderizando componente');
  return (
    <RolProtectedRoute 
      rolesPermitidos={[ROLES.ADMINISTRADOR, ROLES.ARRENDADOR, ROLES.ARRENDATARIO, ROLES.PRESTADOR_SERVICIO]}
      permisos={{ puedeVerServicios: true }}
    >
      {children}
    </RolProtectedRoute>
  );
};

export const MensajesRoute = ({ children }: { children: ReactNode }) => (
  <RolProtectedRoute 
    rolesPermitidos={[ROLES.ADMINISTRADOR, ROLES.ARRENDADOR, ROLES.ARRENDATARIO, ROLES.PRESTADOR_SERVICIO]}
    permisos={{ puedeVerMensajes: true }}
  >
    {children}
  </RolProtectedRoute>
);

export const ProfesionalRoute = ({ children }: { children: ReactNode }) => (
  <RolProtectedRoute 
    rolesPermitidos={[ROLES.PRESTADOR_SERVICIO]}
    permisos={{ puedeAccederProfesional: true }}
  >
    {children}
  </RolProtectedRoute>
);
