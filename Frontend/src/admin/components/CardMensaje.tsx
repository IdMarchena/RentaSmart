import type { Mensaje } from '@/types/entitys';
import { useAuthContext } from '@/context/AuthContext';

interface CardMensajeProps {
  mensaje: Mensaje;
}

export const CardMensaje = ({ mensaje }: CardMensajeProps) => {
  const { user } = useAuthContext();
  
  // Determinar si el mensaje es del usuario autenticado
  const isOwnMessage = Number(mensaje.emisor?.id) === Number(user?.id);

  // Formatear fecha y hora
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Color según estado del mensaje - con colores consistentes
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'LEIDO':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'NO_LEIDO':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'ENVIADO':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ENTREGADO':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'ACTIVO':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'INACTIVO':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'ARCHIVADO':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'BLOQUEADO':
        return 'bg-red-200 text-red-900 border-red-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`w-full flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-3`}>
      <div className={`max-w-[70%] ${isOwnMessage ? 'bg-[#393939] text-white' : 'bg-[#E1DFD2] text-[#393939]'} rounded-lg p-3 shadow-sm`}>
        {/* Nombre del remitente */}
        {!isOwnMessage && (
          <p className="text-xs font-semibold mb-1 opacity-75">
            {mensaje.emisor?.nombre || 'Usuario desconocido'}
          </p>
        )}
        
        {/* Contenido del mensaje */}
        <p className="text-sm break-words">
          {mensaje.contenido}
        </p>
        
        {/* Fecha y estado */}
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className={`text-xs ${isOwnMessage ? 'text-gray-300' : 'text-gray-600'}`}>
            {formatDateTime(mensaje.fechaEnvio)}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full border ${getEstadoColor(mensaje.estado)}`}>
            {mensaje.estado}
          </span>
        </div>
      </div>
    </div>
  );
};
