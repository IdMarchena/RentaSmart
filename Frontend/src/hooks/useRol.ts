import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const ROLES = {
  USER: 'USER',
  ADMINISTRADOR: 'ADMINISTRADOR',
  ARRENDATARIO: 'ARRENDATARIO',
  ARRENDADOR: 'ARRENDADOR',
  PRESTADOR_SERVICIO: 'PRESTADOR_SERVICIO'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const useRol = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUserId, setLastUserId] = useState<string | null>(null);

  useEffect(() => {
    // Resetear estado cuando no hay usuario
    if (!user?.id) {
      console.log('No hay usuario, reseteando rol');
      setUserRole(null);
      setLastUserId(null);
      setLoading(false);
      return;
    }

    // Si el usuario cambió, forzar recarga
    if (lastUserId && lastUserId !== user.id.toString()) {
      console.log(`Usuario cambió de ${lastUserId} a ${user.id}, forzando recarga de rol`);
      setUserRole(null);
    }

    const fetchUserRole = async () => {
      try {
        setLoading(true);
        console.log(`Verificando rol para usuario ID: ${user.id}`);
        
        // Verificar cada rol hasta encontrar el correcto
        const rolesToTest = [ROLES.ADMINISTRADOR, ROLES.ARRENDADOR, ROLES.ARRENDATARIO, ROLES.PRESTADOR_SERVICIO];
        
        for (const role of rolesToTest) {
          try {
            const verifyResponse = await fetch(`http://localhost:8080/api/usuarios/userVerificate/${user.id}/rol?rol=${role}`);
            if (verifyResponse.ok) {
              const response = await verifyResponse.json();
              console.log(`Verificación rol ${role}:`, response);
              console.log(`Response success:`, response.success);
              console.log(`Response data:`, response.data);
              console.log(`Response result:`, response.result);
              
              // Tu backend devuelve {success: true, data: true} cuando el rol coincide
              // Manejamos diferentes posibles estructuras de respuesta
              const hasRole = response.data === true || 
                             response.result === true || 
                             response.success === true;
              
              console.log(`¿Tiene rol ${role}?`, hasRole);
              
              if (hasRole) {
                console.log(`Rol confirmado: ${role}`);
                setUserRole(role);
                setLastUserId(user.id.toString());
                return;
              }
            } else if (verifyResponse.status === 403) {
              // 403 significa que el usuario no tiene este rol, continuamos con el siguiente
              console.log(`Rol ${role} no coincide (403), continuando...`);
              continue;
            }
          } catch (verifyErr) {
            console.log(`Error verificando rol ${role}:`, verifyErr);
          }
        }
        
        // Si no encontramos ningún rol, asignamos USER
        console.log('No se encontró ningún rol específico, asignando USER');
        setUserRole(ROLES.USER);
        setLastUserId(user.id.toString());
      } catch (err) {
        console.error('Error al obtener rol:', err);
        setUserRole(ROLES.USER);
        setLastUserId(user.id.toString());
      } finally {
        setLoading(false);
      }
    };

    // Solo hacer la llamada si no tenemos el rol o si el usuario cambió
    if (!userRole || lastUserId !== user.id.toString()) {
      fetchUserRole();
    } else {
      setLoading(false);
    }
  }, [user?.id]); // Solo dependemos del ID del usuario 

  // Métodos para verificar roles específicos
  const verificarRol = (rol: Role): boolean => {
    if (loading || !userRole) return false;
    return userRole === rol;
  };

  const verificarRoles = (roles: Role[]): boolean => {
    if (loading || !userRole) return false;
    return roles.includes(userRole);
  };

  // Métodos de conveniencia
  const esAdministrador = (): boolean => verificarRol(ROLES.ADMINISTRADOR);
  const esArrendatario = (): boolean => verificarRol(ROLES.ARRENDATARIO);
  const esArrendador = (): boolean => verificarRol(ROLES.ARRENDADOR);
  const esPrestadorServicio = (): boolean => verificarRol(ROLES.PRESTADOR_SERVICIO);
  const esUser = (): boolean => verificarRol(ROLES.USER);

  // Métodos para permisos específicos
  const puedeVerPublicaciones = (): boolean => {
    return esAdministrador() || esArrendador();
  };

  const puedeVerContratos = (): boolean => {
    return esAdministrador() || esArrendador() || esArrendatario();
  };

  const puedeVerServicios = (): boolean => {
    return esAdministrador() || esArrendador() || esArrendatario() || esPrestadorServicio();
  };

  const puedeVerMensajes = (): boolean => {
    return true; // Todos los roles pueden ver mensajes
  };

  const puedeCrearPublicaciones = (): boolean => {
    return esAdministrador() || esArrendador();
  };

  const puedeCrearContratos = (): boolean => {
    return esAdministrador() || esArrendador();
  };

  const puedeAccederProfesional = (): boolean => {
    return esPrestadorServicio();
  };

  // Método para forzar la recarga del rol (útil para debugging o cuando se sospecha que el rol está desactualizado)
  const refrescarRol = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      console.log(`Forzando recarga de rol para usuario ID: ${user.id}`);
      
      // Verificar cada rol hasta encontrar el correcto
      const rolesToTest = [ROLES.ADMINISTRADOR, ROLES.ARRENDADOR, ROLES.ARRENDATARIO, ROLES.PRESTADOR_SERVICIO];
      
      for (const role of rolesToTest) {
        try {
          const verifyResponse = await fetch(`http://localhost:8080/api/usuarios/userVerificate/${user.id}/rol?rol=${role}`);
          if (verifyResponse.ok) {
            const response = await verifyResponse.json();
            console.log(`Verificación rol ${role}:`, response);
            
            // Tu backend devuelve {success: true, data: true} cuando el rol coincide
            // Manejamos diferentes posibles estructuras de respuesta
            const hasRole = response.data === true || 
                           response.result === true || 
                           response.success === true;
            
            console.log(`¿Tiene rol ${role}?`, hasRole);
            
            if (hasRole) {
              console.log(`Rol actualizado: ${role}`);
              setUserRole(role);
              setLastUserId(user.id.toString());
              return;
            }
          } else if (verifyResponse.status === 403) {
            // 403 significa que el usuario no tiene este rol, continuamos con el siguiente
            console.log(`Rol ${role} no coincide (403), continuando...`);
            continue;
          }
        } catch (verifyErr) {
          console.log(`Error verificando rol ${role}:`, verifyErr);
        }
      }
      
      // Si no encontramos ningún rol, asignamos USER
      console.log('No se encontró ningún rol específico, asignando USER');
      setUserRole(ROLES.USER);
      setLastUserId(user.id.toString());
    } catch (err) {
      console.error('Error al recargar rol:', err);
      setUserRole(ROLES.USER);
      setLastUserId(user.id.toString());
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userRole,
    roles: {
      [ROLES.USER]: esUser(),
      [ROLES.ADMINISTRADOR]: esAdministrador(),
      [ROLES.ARRENDATARIO]: esArrendatario(),
      [ROLES.ARRENDADOR]: esArrendador(),
      [ROLES.PRESTADOR_SERVICIO]: esPrestadorServicio(),
    },
    verificarRol,
    verificarRoles,
    esAdministrador,
    esArrendatario,
    esArrendador,
    esPrestadorServicio,
    esUser,
    puedeVerPublicaciones,
    puedeVerContratos,
    puedeVerServicios,
    puedeVerMensajes,
    puedeCrearPublicaciones,
    puedeCrearContratos,
    puedeAccederProfesional,
    refrescarRol, // Nuevo método para debugging
  };
};
